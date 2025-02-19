import './App.css'
import { 
  Button,
  Typography,
  Card,
  Input,
  Radio,
  Select,
  Option,
} from "@material-tailwind/react";

function App() {
  return (
    <div>
      <header className="mx-auto bg-black text-white p-8"><Typography className="text-center" variant="h1" color="white">FRC 2025 SCOUTING APP</Typography></header>
      
      <main>
        <Card className="form m-12 p-8">
          <form id="scoutingForm">
            <header><h2>Scout Match</h2></header>
            <p style={{color: 'red', paddingTop: '15px'}}>All fields are required.</p><br />
            <div className="questions grid grid-cols-2 gap-5">
              <div><label htmlFor="matchnum">Match Number: </label><Input type="number" id="matchnum" size="" /></div>
              <div><label htmlFor="team">Team Number: </label><Input type="number" id="team" size="md" /></div>
              <div>
                <label htmlFor="startingpos">Starting Position:</label>
                <Select id="startingpos" name="startingpos">
                  <Option value="Red Left">Red Left</Option>
                  <Option value="Red Center">Red Center</Option>
                  <Option value="Red Right">Red Right</Option>
                  <Option value="Blue Left">Blue Left</Option>
                  <Option value="Blue Center">Blue Center</Option>
                  <Option value="Blue Right">Blue Right</Option>
                </Select>
              </div>
              <div>
                <label>Leave Points?</label><br />
                <Radio name="leave" id="leave-y" value="Yes" /><label htmlFor="leave-y">Yes</label>
                <Radio name="leave" id="leave-n" value="No" /><label htmlFor="leave-n">No</label>
              </div>
              <div>
                <label>Starting Game Piece:</label><br />
                <Radio name="gamepiece" id="gamepiece-coral" value="coral" /><label htmlFor="gamepiece-coral">Coral</label>
                <Radio name="gamepiece" id="gamepiece-algae" value="algae" /><label htmlFor="gamepiece-algae">Algae</label>
              </div>
              <div><label htmlFor="coral">Coral Scored: </label><Input type="number" id="coral" size="md" /></div>
              <div><label htmlFor="algae">Algae Scored: </label><Input type="number" id="algae" size="md" /></div>
              <div>
                <label htmlFor="endgame">Endgame:</label>
                <Select id="endgame" name="endgame">
                  <Option value="shallow">Shallow Climb</Option>
                  <Option value="deep">Deep Climb</Option>
                  <Option value="park">Park</Option>
                  <Option value="none">None</Option>
                </Select>
              </div>
              <div><label htmlFor="points">Total Points: </label><Input type="number" id="points" size="md" /></div>
              <div>
                  <label>Result:</label><br />
                  <label htmlFor="win"><Radio name="matchresult" id="win" value="win" />Win</label>
                  <Radio name="matchresult" id="lose" value="lose" /><label htmlFor="lose">Lose</label>
                  <Radio name="matchresult" id="tie" value="tie" /><label htmlFor="tie">Tie</label>
              </div>
            </div>
            
            <div><Button>Submit</Button></div>
          </form>
        </Card>
        
        <Card className="results m-8 p-8 bg-black text-white">
            <header><h2>Match Results</h2></header>
            
            <div className="matches" id="matches">
                <p>No results yet.</p>
            </div>
        </Card>
      </main>
    </div>
  )
}

export default App
