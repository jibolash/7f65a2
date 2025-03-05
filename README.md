### Installation

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. The app depends on the server [here](https://github.com/mosaic-avantos/frontendchallengeserver). Clone that repo and start the server. This app expects it to run on port 3000
4. Run this app
   ```bash
   npm run dev
   ```

### Usage

1. Visit http://localhost:5173/
2. A DAG based on the nodes and edges returned from the server.
3. Clicking on a node should show the prefill UI for that node.
4. Clicking a field within the prefill UI should display a modal with data from previous node forms
5. When a field is filled, a button is added to enable a clear the field's value
