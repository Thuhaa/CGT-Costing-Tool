# CGT Costing Model: Methodology Note

**Purpose:** to document how the CGT costing tool produces its estimates, the structure, the baseline effort, and the multipliers, so the logic is transparent and reviewable.

**Status, stated plainly:** the *structure* of this model is built on how CGT implementations actually work and is intended to be defensible. The *specific numbers* (baseline days, multiplier values, unit costs) are first-pass estimates. They are deliberately held as adjustable inputs because the credible way to set them is by calibration against real implementation costs, our Bhutan and Malaysia pilots, and experience from the Latin America and Caribbean rollouts. Until that calibration is done, all figures should be treated as indicative, for planning and demonstration only.

---

## 1. How the model is structured

The cost of a CGT implementation is modelled along two axes that combine:

- **The place** (context): how big, how populous, how difficult the terrain, how much usable data already exists, and how many care categories are in scope.
- **The depth of service**: how deep the analysis goes, how much is packaged and reported, and how much support is provided.

These are applied to a **cost spine of the seven-phase methodology**. Each phase has a baseline effort; the context and service multipliers scale that effort up or down. The model also separates **one-time set-up cost** from **annual recurring cost**, because the recurring figure is what determines whether a government can sustain the tool.

In short: **estimate = (baseline effort per phase) × (context and service multipliers) × (day rate), plus non-labour and recurring costs.**

---

## 2. Baseline effort per phase

These are the reference person-days for a mid-range implementation (a large city, moderate data, two care categories, standard service level). The **relative** proportions are the defensible part: supply and accessibility work is heavier than scoping. The **absolute** level is the first thing to check against real costs.

| Phase | Base days | Reasoning |
|---|---|---|
| 1. Scoping & strategic alignment | 15 | Mostly alignment and scope-setting; lightest phase. |
| 2. Methodological adaptation & workplan | 20 | Tailoring the methodology, defining care, designing the workplan. |
| 3. Mapping care supply | 35 | Heaviest: locating all services across registries, open data, web and field sources. |
| 4. Mapping care demand | 25 | Mapping population and care-dependent groups by location. |
| 5. Accessibility & gap analysis | 30 | Network building, routing, and care-desert analysis; technically heavy. |
| 6. Care Map & visualisation | 28 | Building the maps and platform. |
| 7. Validation & capacity transfer | 25 | Validation workshops, training and handover. |
| **Reference total** | **~178** | Pre-multiplier baseline. |

---

## 3. The multipliers

Each driver scales specific phases. The **direction** of every multiplier is justified from how the work behaves; the **exact value** is a first-pass judgment to be calibrated.

| Driver | Range | Applied to | Why it scales cost |
|---|---|---|---|
| Territory size | 1.0 – 2.0 | Scoping (light), supply, accessibility | Larger areas mean more ground to map, more roads to model, more field logistics. |
| Population | 0.85 – 1.6 | Supply, demand, validation | More people means more services to find and more demand to map. |
| Geographic complexity | 1.0 – 1.5 | Accessibility | Difficult terrain makes routing harder and needs more validation. |
| Data availability | 0.8 – 1.5 | Supply, demand, validation | The biggest swing: poor data forces labour-intensive primary collection. |
| Care categories | 0.85 – 1.25 | Adaptation, supply, demand | Each category adds another service set and population group to map. |
| Analysis depth | 0.85 – 1.3 | Demand, accessibility | Deeper analysis (scenarios, equity, projections) adds analyst time. |
| Reporting level | 0.9 – 1.25 | Care Map & visualisation | More products (briefs, dashboards, public map) take more effort. |
| Support level | 0.9 – 1.35 | Validation, and recurring cost | More support adds handover effort and, mainly, ongoing cost. |

Two optional layers also add cost: the **climate / compound-vulnerability layer** adds to accessibility work and data acquisition; the **public citizen map** adds to platform build, hosting and maintenance.

---

## 4. Cost categories

Effort is converted to cost with a **blended day rate** (currently a placeholder of USD 300/day, representing a mix of international and national effort). On top of labour:

**Set-up (one-time)**
- Personnel: total person-days × day rate (the largest component).
- Data acquisition: scales with data availability (placeholder USD 1,000 / 3,000 / 8,000 for good / partial / poor) and care categories; climate layer adds more.
- Platform set-up: higher when a public citizen map is included.
- Regional technical support: USD 15,000, confirmed, flat (see 5.1).
- Travel and mission costs: illustrative placeholder built from flight and DSA components (see 5.2).

**Recurring (annual)**
- Hosting: higher with a public-facing map.
- Data refresh: modelled at roughly 15% of the original effort each year, to keep the map current.
- Maintenance and support: scales with the support level, and includes a fixed support component by tier.

---

## 5. Why the figures are not yet final, and how they become defensible

The model is structurally complete but not yet calibrated. Three inputs will make the numbers credible, in order of value:

1. **Our own pilot actuals.** Once Bhutan and Malaysia costs are known, ideally by phase, they anchor the baseline and test the multipliers. Bhutan (mountainous, data-poor) should cost more than Malaysia in the model; checking that against reality validates the logic.
2. **LAC experience.** The regional team has implemented the CGT multiple times. Even rough figures, or rules of thumb such as the typical share of cost taken by fieldwork, would calibrate the absolute levels far better than the current placeholders.
3. **A documented rationale per value.** Each multiplier already has a one-line justification (above); these can be firmed up as evidence comes in.

**Scope to confirm during calibration:** the figures should make explicit whether they include primary fieldwork, regional team technical support, and recurring costs, since these are the items most often left ambiguous in a single quoted number, and the ones that most affect the total.

### 5.1 First confirmed input: regional technical support

As of June 2026, the model carries its first real, confirmed figure rather than a placeholder: **regional technical support costs USD 15,000**, one-time, set-up phase. This covers UNDP regional-hub input during set-up: guiding consultants on the methodology, CGT-related meetings, and inputs to the country-office TOR. Two things about this figure matter for how it is used:

- It is **labour only**. Travel and mission costs for regional-team input are explicitly excluded from this figure, and are costed separately (see 5.2).
- It is treated as a **flat cost**, not scaled by territory, population or terrain, because the scope of regional guidance (methodological input, meetings, TOR review) does not clearly scale with the size of the place being mapped. This is a reasoned assumption, not a tested one; if future data shows regional support scales with implementation complexity rather than being roughly fixed, the model should be updated accordingly.
- The extent of what is included is not fully defined ("guiding consultants on the methodology... basically everything we have to do"), so this figure should be treated as a **floor**, not a ceiling, until scoped more precisely.

### 5.2 Travel and mission costs

Travel was previously absent from the model entirely, a real gap rather than a considered omission. It is now included as an explicit, editable line, built from illustrative components rather than a live rate table:

| Component | Illustrative value | Basis |
|---|---|---|
| Flight (BKK to a regional Asian capital, economy return) | USD 700 | Rough typical fare; not sourced from a live booking |
| Daily subsistence allowance (DSA) | USD 200 / night | Placeholder; **not** the actual published UN DSA rate |
| Nights per mission | 6 | Typical mission length assumption |
| Number of missions (set-up) | 2 | e.g. a scoping mission and a validation/training mission |
| Travelers per mission | 1 | Adjustable for team travel |

At these defaults, travel adds approximately USD 3,800 to a standard set-up. **This figure must be checked against the actual, current UN DSA schedule for the relevant country before it is used in any real budget or proposal.** It is a placeholder that makes an existing cost visible, not a sourced estimate.

---

## 6. Known limitations

- The numbers are indicative pending calibration; they should not yet be used in proposals or budgets as firm figures.
- The day rate is a single blended placeholder; a real model may separate international, national and government-counterpart time.
- The model assumes heavy use of open-source software and open data (low licensing cost), consistent with current practice. Commercial data or tools would shift the numbers.
- Costs are shown nominally; no inflation or discounting is applied over the five-year view.

---

*This note documents the logic behind the CGT costing tool. The tool itself is a working model; this note explains what is structural and defensible versus what still requires calibration against real implementation data.*