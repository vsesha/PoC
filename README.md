PoC with What If Scenario
A simple tool that is developed levraging different tech stack

Workflow: 
-----------
- Takes the input parameters
- churns to server running on Node/Express to get a portfolio of trades. 
- Once Calc clicked, invokes server calls Node and spawns a child process
- Invokes Python script (from child process)
- And plots the charts 
- Saves the historic data on MongoDB (using mongoose libs)

Tech Stack
-----------
- UI: HTML5/AngularJS/Bootstrap hosted on gulp WS
- Controls: ngHandson/Hotable, 
- Server: NodeJS/Express
- Core: Python
- DB: MongoDB
