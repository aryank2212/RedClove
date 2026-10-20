# RedClove / KAAL Consolidation Audit

**Status:** Initial evidence-based audit; no repositories, branches, deployment settings, or production domains have been deleted, renamed, or changed.
**Audit date:** 2026-10-20

## Executive summary

The public GitHub inventory and Vercel project metadata show that this is not yet a single coherent RedClove/KAAL project map. First establish the canonical source of truth and verify the actual production website before changing repository names or deployment wiring.

## Repository findings

| Repository | Observed evidence | Provisional disposition |
|---|---|---|
| [KAAL](https://github.com/aryank2212/KAAL) | Public, default branch `main`, approximately 78,298 KB. README describes autonomous swarm and adversarial-defense framework. Latest observed commit is from 2026-06-28. | Preserve as legacy/reference until a file-level and history comparison is complete. |
| [KAAL_v2](https://github.com/aryank2212/KAAL_v2) | Public, default branch `main`, approximately 78,767 KB. README documents RF-DETR, FFT and temporal anomaly cues, evaluation tooling, FastAPI, dashboard, CI, and explicit limits on current swarm maturity. Latest observed commit is from 2026-10-16. | Strongest candidate for the current KAAL implementation; not yet declared canonical until tests, history, assets, model artifacts, and local copies are checked. |
| [KAAL_ASE_Release](https://github.com/aryank2212/KAAL_ASE_Release) | Public, default branch `main`, approximately 413 KB. README describes a FastAPI OSINT/evidence-management application, local Ollama analysis, case/evidence records, and placeholder vector/graph endpoints. Recent security hardening commits are dated 2026-10-14. | Best match found for the existing KAAL-ASE code. Verify whether this is the release mirror or the authoritative development repository. |
| `KAAL-ASE` | Exact public repository lookup returned 404. | Do not infer deletion: it may have been renamed, be private, or live on another Git server. |
| `KAAL_2` | Exact public repository lookup returned 404; it was not present in the accessible public repository inventory. | Search local clones and the user's Gitea instance before taking action. |
| [RedClove](https://github.com/aryank2212/RedClove) | Public, default branch `main`. README describes a React/Vite marketing and Academy site, with Home/Courses/Pricing/Contact routes. The current source inventory does not establish the claimed KAAL project index/search experience. | This repository is linked to the Vercel project named `redclove`; audit its actual deployment/content before treating it as the intended canonical RedClove portal. |

## Vercel / domain observations

- The Vercel project named `redclove` is linked to `aryank2212/RedClove`.
- Vercel reports `redclove.space` as a verified custom domain on that project.
- The project's latest deployment metadata reported `READY`, but the project metadata also reported `live: false`. Verify the production alias, deployment target, and live browser content before publishing changes.
- A separate Vercel project named `elite-club` is linked to `aryank2212/elites-site`. That repository's README says it contains The Elites student-club website and is not the RedClove portal. Do not use it as the target for RedClove consolidation.

## Architecture decision proposal

RedClove should be the umbrella brand and discovery portal. KAAL is the core perception/robustness/swarm-research system. KAAL-ASE is a distinct OSINT and evidence-management application in the KAAL ecosystem; it should remain a separate deployable codebase with its own security boundary, storage, and release cycle.

Provisional repository targets:

- `KAAL`: canonical repository name for the core KAAL system after a verified migration from `KAAL_v2`.
- `KAAL-ASE`: canonical repository name for the application after identifying and comparing all development and release remotes.
- RedClove portal: retain the repository currently linked to the production domain only if its live content and deployment configuration are confirmed to be the intended portal. Otherwise locate the correct source before altering the domain mapping.

No rename, archive, force-push, history rewrite, or production-domain change is authorized by this audit.

## Required verification before consolidation

1. Enumerate local clones and remotes, including the known Gitea candidate for KAAL-ASE: `http://100.77.54.107:3000/ak/KAAL.git` (verify availability and repository identity locally).
2. Locate the original KAAL-ASE development repository and any `KAAL_2` clone; compare remotes, branch heads, tags, commit ancestry, and working-tree changes.
3. Compare `KAAL` and `KAAL_v2` at file level. Preserve model weights, dataset registries, benchmark results, licenses, and any unique history. Do not decide by repository size alone.
4. Run documented unit/integration tests and a reproducible smoke test on the chosen KAAL baseline.
5. For KAAL-ASE, finish the history cleanup described in `docs/SECURITY_CLEANUP.md` only after confirming the exposed paths, coordinating any collaborators, and rotating potentially exposed credentials. The README warns that removing files from the current tree does not purge Git history.
6. Confirm the production deployment and live `redclove.space` content. Map every project card and search result to a verified canonical repository, documentation page, and status.
7. Implement the RedClove project index/search on a branch with tests and a preview deployment. Do not point the production domain at a new target until preview verification passes.

## Acceptance criteria

- One documented canonical source of truth for KAAL and one for KAAL-ASE.
- No unique code, model, dataset, release, or commit history lost during migration.
- Search results are grounded in a version-controlled project registry and show source links and last-verified status.
- Website claims distinguish implemented, experimental, and planned features.
- Security-sensitive KAAL-ASE records and secrets are not exposed; security cleanup is verified.
- Production domain and deployment settings remain unchanged until an explicitly reviewed release.
