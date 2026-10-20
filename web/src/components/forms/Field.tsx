import type { ReactNode } from "react";

type Props = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children?: ReactNode;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
};

/** Labelled input with inline error; pass children to render a custom control (select/textarea). */
export function Field({ label, name, error, hint, optional, children, type = "text", autoComplete, placeholder, required }: Props) {
  const id = `f-${name}`;
  const describedBy = [error ? `${id}-err` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium">
        {label} {optional ? <span className="font-normal text-smoke">(optional)</span> : null}
      </label>
      {children ?? (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="field"
        />
      )}
      {hint ? <p id={`${id}-hint`} className="text-xs text-smoke">{hint}</p> : null}
      {error ? <p id={`${id}-err`} className="text-sm text-amber">{error}</p> : null}
    </div>
  );
}
