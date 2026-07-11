# Project Rules

Whenever you need to create a plan, comparison, diagram, table, code diff, report, or any complex explanation, you must run a `grill-me` session first to stress-test and align on the plan with the user.
After the grilling session is complete, you must then use the `lavish` skill to finalize it.
Always generate an interactive HTML artifact under `.lavish/` and open it with `lavish-axi` so the user can visually review, annotate, and give feedback on the plan.
Do not deliver these complex plans as plain prose or markdown in the chat unless specifically requested.
For any action or task requested by the user, you must always run a `grill-me` session first to extract detailed context and align on the plan before implementing.
After the grilling session is complete, finalize the plan using the `lavish` skill to present a visual review page.

