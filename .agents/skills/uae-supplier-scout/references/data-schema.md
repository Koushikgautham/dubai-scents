# Data schema for `sourcing/*.csv`

Keep headers exactly as below (other tools and the future Supabase import depend on them). Use `;` to separate multiple values inside a cell. Dates are `YYYY-MM-DD`. Leave unknowns empty — never fill with guesses.

`verified` levels:
- `confirmed` — seen on an official register/licence or confirmed directly by the company in writing.
- `listed` — public listing with real address/website, not yet confirmed directly.
- `unverified` — mentioned somewhere but not yet corroborated.

`status`: `lead` → `contacted` → `replied` → `meeting-booked` → `visited` → `shortlisted` / `backup` / `rejected`.

## manufacturers.csv
```
slug,name,type,emirate,area,address,website,phone,email,source_urls,verified,makes_alcohol_free_oils,private_label,docs_sds,docs_ifra,docs_coa,flash_point_note,moq_note,exclusivity_escrow_note,authorisation_letter,india_export_experience,red_flags,score,status,last_checked,notes_file
```
- `type`: `manufacturer` | `trader` | `unknown`.
- `docs_*`, `private_label`, `makes_alcohol_free_oils`, `authorisation_letter`, `india_export_experience`: `yes` | `no` | `unknown`.

## fillers.csv
```
slug,name,city,state,address,in_sez,licence_no,licence_valid_to,licence_covers_cat41,loan_licence_ok,min_run_units,roll_on_filling,bulk_repack,website,phone,email,source_urls,verified,red_flags,score,status,last_checked,notes_file
```
- `in_sez`, `licence_covers_cat41`, `loan_licence_ok`, `roll_on_filling`, `bulk_repack`: `yes` | `no` | `unknown`.

## brokers.csv
```
slug,name,city,services,licensed_customs_broker,cosmetics_cdsco_experience,dg_handling,fee_note,website,phone,email,source_urls,verified,score,status,last_checked,notes_file
```

## packaging.csv
```
slug,name,city,country,items,moq_note,price_note,website,phone,email,source_urls,verified,status,last_checked,notes_file
```

## notes/<slug>.md
```markdown
# <Company name>
- **Type / location:** …
- **Sources:** <urls> (checked YYYY-MM-DD)
## What we know
## Open questions (ask on visit)
## Red flags
## Contact log
- YYYY-MM-DD — <channel> — <summary> (draft / sent by founder / reply)
## Verdict
<go / proceed with conditions / walk away> — <why> — <what would change it>
```
