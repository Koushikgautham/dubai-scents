"""
Roll-on bottle for the website hero — authored procedurally in Blender (bpy).

Run headless from the repo root:
  /Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
      --python web/assets-src/rollon.py -- [--render]

Outputs:
  web/public/models/rollon.glb      (separate nodes: Glass, Oil, Insert, Ball, Cap)
  web/public/bottle-poster.png      (only with --render; transparent PNG fallback/OG image)
  web/assets-src/rollon.blend       (source file for manual tweaks)

Units are scene units matching the web scene (bottle body ≈ 2.4 tall, Y-up after glTF export).
"""

import math
import os
import sys

import bmesh
import bpy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_GLB = os.path.join(ROOT, "public", "models", "rollon.glb")
OUT_PNG = os.path.join(ROOT, "public", "bottle-poster.png")
OUT_BLEND = os.path.join(ROOT, "assets-src", "rollon.blend")
ARGS = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
DO_RENDER = "--render" in ARGS

SEG = 128  # revolution segments


# ---------------------------------------------------------------- helpers
def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def revolve(name, profile, segments=SEG, closed_top=False):
    """Revolve an (r, z) profile chain around Z. Points with r == 0 become poles."""
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    bm = bmesh.new()
    verts = [bm.verts.new((r, 0.0, z)) for r, z in profile]
    edges = [bm.edges.new((verts[i], verts[i + 1])) for i in range(len(verts) - 1)]
    bmesh.ops.spin(
        bm,
        geom=verts + edges,
        cent=(0, 0, 0),
        axis=(0, 0, 1),
        angle=math.tau,
        steps=segments,
        use_merge=True,
    )
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    return obj


def smooth(obj, angle_deg=35):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=math.radians(angle_deg))
    except Exception:
        bpy.ops.object.shade_smooth()
    obj.select_set(False)


def material(name, **kw):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    sockets = {
        "base": "Base Color",
        "metallic": "Metallic",
        "roughness": "Roughness",
        "ior": "IOR",
        "transmission": "Transmission Weight",
        "coat": "Coat Weight",
        "coat_roughness": "Coat Roughness",
        "emission": "Emission Color",
        "emission_strength": "Emission Strength",
        "alpha": "Alpha",
    }
    for k, v in kw.items():
        sock = bsdf.inputs.get(sockets[k])
        if sock is not None:
            sock.default_value = v
    return m


def assign(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)


# ---------------------------------------------------------------- model
def build():
    # Thick-walled glass shell: outer profile up, over the neck rim, inner profile down.
    glass_profile = [
        (0.0, -1.20), (0.30, -1.20), (0.37, -1.185), (0.415, -1.15), (0.43, -1.08),
        (0.43, 0.64), (0.422, 0.74), (0.395, 0.82), (0.34, 0.885), (0.26, 0.94),
        (0.215, 0.975), (0.205, 1.01), (0.205, 1.15), (0.196, 1.175), (0.178, 1.18),
        (0.168, 1.165), (0.166, 1.00), (0.19, 0.93), (0.29, 0.86), (0.36, 0.78),
        (0.383, 0.68), (0.385, 0.62), (0.385, -0.93), (0.37, -0.99), (0.33, -1.015),
        (0.0, -1.02),
    ]
    glass = revolve("Glass", glass_profile)
    smooth(glass, 40)

    # Oil volume with a slight meniscus; sits just inside the cavity.
    oil_profile = [
        (0.0, -1.012), (0.32, -1.01), (0.362, -0.99), (0.379, -0.93),
        (0.379, 0.47), (0.372, 0.495), (0.35, 0.50), (0.0, 0.493),
    ]
    oil = revolve("Oil", oil_profile, segments=96)
    smooth(oil, 50)

    # Roller insert (frosted housing) in the neck.
    insert_profile = [
        (0.0, 1.04), (0.162, 1.04), (0.166, 1.06), (0.166, 1.20), (0.15, 1.215), (0.125, 1.22), (0.11, 1.205),
        (0.10, 1.10), (0.0, 1.10),
    ]
    insert = revolve("Insert", insert_profile, segments=96)
    smooth(insert, 40)

    bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=32, radius=0.142, location=(0, 0, 1.235))
    ball = bpy.context.active_object
    ball.name = "Ball"
    smooth(ball, 80)

    # Cap: open-bottom shell with a rounded crown, knurled grip band and two fine grooves.
    cap_profile = [
        (0.232, 1.12), (0.262, 1.12), (0.27, 1.13), (0.27, 1.17), (0.262, 1.175), (0.262, 1.19),
        (0.272, 1.195), *[(0.272, 1.195 + i * (0.765 / 16)) for i in range(1, 16)], (0.272, 1.96), (0.264, 1.965), (0.264, 1.985), (0.272, 1.99), (0.272, 2.06),
        (0.266, 2.095), (0.25, 2.115), (0.22, 2.125), (0.0, 2.127),
    ]
    cap = revolve("Cap", cap_profile, segments=192)
    me = cap.data
    for v in me.vertices:
        x, y, z = v.co
        r = math.hypot(x, y)
        if r > 0.268 and 1.21 < z < 1.94:
            a = math.atan2(y, x)
            step = round((a % math.tau) / math.tau * 192) % 2
            k = 1.0 - (0.022 if step else 0.0)
            v.co.x *= k
            v.co.y *= k
    # Inner wall so the cap reads as a solid part when lifted.
    inner = revolve("CapInner", [(0.232, 1.12), (0.232, 2.07), (0.0, 2.075)], segments=96)
    bpy.ops.object.select_all(action="DESELECT")
    cap.select_set(True)
    inner.select_set(True)
    bpy.context.view_layer.objects.active = cap
    bpy.ops.object.join()
    smooth(cap, 30)

    # Materials (PBR, exported as glTF Principled → KHR extensions)
    m_glass = material("Glass", base=(0.98, 0.96, 0.93, 1), roughness=0.02, ior=1.47, transmission=1.0, coat=1.0, coat_roughness=0.02)
    m_oil = material("Oil", base=(0.62, 0.24, 0.02, 1), roughness=0.08, ior=1.47, transmission=0.85, emission=(0.4, 0.13, 0.0, 1), emission_strength=0.12)
    m_insert = material("Insert", base=(0.92, 0.9, 0.86, 1), roughness=0.45, transmission=0.35)
    m_ball = material("Steel", base=(0.92, 0.91, 0.89, 1), metallic=1.0, roughness=0.08)
    m_cap = material("Gold", base=(1.0, 0.76, 0.42, 1), metallic=1.0, roughness=0.24, coat=0.4, coat_roughness=0.15)
    assign(glass, m_glass)
    assign(oil, m_oil)
    assign(insert, m_insert)
    assign(ball, m_ball)
    assign(cap, m_cap)
    return {"Glass": glass, "Oil": oil, "Insert": insert, "Ball": ball, "Cap": cap}


# ---------------------------------------------------------------- export
def export_glb():
    os.makedirs(os.path.dirname(OUT_GLB), exist_ok=True)
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=OUT_GLB,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_normals=True,
        export_materials="EXPORT",
        export_cameras=False,
        export_lights=False,
    )
    print(f"[rollon] wrote {OUT_GLB} ({os.path.getsize(OUT_GLB)/1024:.0f} KB)")


# ---------------------------------------------------------------- poster render
def render_poster():
    scene = bpy.context.scene
    engines = [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items]
    scene.render.engine = "CYCLES" if "CYCLES" in engines else engines[0]
    if scene.render.engine == "CYCLES":
        scene.cycles.samples = 192
        scene.cycles.use_denoising = True
        try:
            prefs = bpy.context.preferences.addons["cycles"].preferences
            prefs.compute_device_type = "METAL"
            prefs.get_devices()
            for d in prefs.devices:
                d.use = True
            scene.cycles.device = "GPU"
        except Exception:
            scene.cycles.device = "CPU"
    scene.render.film_transparent = True
    scene.render.resolution_x, scene.render.resolution_y = 1000, 1400
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "AgX" if "AgX" in [v.name for v in scene.view_settings.bl_rna.properties["view_transform"].enum_items] else "Filmic"

    world = bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (0.05, 0.03, 0.015, 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.25

    def area(name, loc, rot, size, energy, color):
        light = bpy.data.lights.new(name, "AREA")
        light.shape = "RECTANGLE"
        light.size, light.size_y = size
        light.energy = energy
        light.color = color
        ob = bpy.data.objects.new(name, light)
        ob.location = loc
        ob.rotation_euler = rot
        bpy.context.collection.objects.link(ob)

    # Product lighting: soft key, two tall strip lights for vertical glass highlights,
    # and a warm backdrop that only refractions/reflections can see (camera-invisible).
    area("Key", (3.2, -3.4, 2.2), (math.radians(60), 0, math.radians(42)), (2.4, 2.4), 160, (1.0, 0.86, 0.7))
    area("StripL", (-1.7, -1.2, 0.4), (math.radians(90), 0, math.radians(-55)), (0.25, 5.0), 260, (1.0, 0.8, 0.55))
    area("StripR", (1.7, -1.0, 0.4), (math.radians(90), 0, math.radians(55)), (0.25, 5.0), 200, (1.0, 0.85, 0.65))
    area("Top", (0, -0.5, 4.0), (0, 0, 0), (1.5, 1.5), 90, (1.0, 0.85, 0.65))

    bpy.ops.mesh.primitive_plane_add(size=14, location=(0, 3.2, 0.5), rotation=(math.radians(90), 0, 0))
    backdrop = bpy.context.active_object
    backdrop.name = "Backdrop"
    bm = bpy.data.materials.new("BackdropGlow")
    bm.use_nodes = True
    nt = bm.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    emit = nt.nodes.new("ShaderNodeEmission")
    grad = nt.nodes.new("ShaderNodeTexGradient")
    grad.gradient_type = "SPHERICAL"
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (0.02, 0.012, 0.006, 1)
    ramp.color_ramp.elements[1].color = (0.9, 0.42, 0.08, 1)
    mapping = nt.nodes.new("ShaderNodeMapping")
    mapping.inputs["Scale"].default_value = (0.22, 0.22, 0.22)
    coord = nt.nodes.new("ShaderNodeTexCoord")
    nt.links.new(coord.outputs["Object"], mapping.inputs["Vector"])
    nt.links.new(mapping.outputs["Vector"], grad.inputs["Vector"])
    nt.links.new(grad.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], emit.inputs["Color"])
    emit.inputs["Strength"].default_value = 2.2
    nt.links.new(emit.outputs["Emission"], out.inputs["Surface"])
    backdrop.data.materials.append(bm)
    backdrop.visible_camera = False
    backdrop.visible_shadow = False

    cam_data = bpy.data.cameras.new("Cam")
    cam_data.lens = 85
    cam = bpy.data.objects.new("Cam", cam_data)
    bpy.context.collection.objects.link(cam)
    cam.location = (0, -11.5, 0.75)
    cam.rotation_euler = (math.radians(88.5), 0, 0)
    scene.camera = cam

    scene.render.filepath = OUT_PNG
    bpy.ops.render.render(write_still=True)
    print(f"[rollon] wrote {OUT_PNG}")


if __name__ == "__main__":
    reset_scene()
    build()
    export_glb()
    os.makedirs(os.path.dirname(OUT_BLEND), exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=OUT_BLEND)
    if DO_RENDER:
        render_poster()
