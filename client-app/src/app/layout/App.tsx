import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDasboard from '../../features/activities/dasboard/ActivityDasboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode]= useState(false);
  const [loading, setLoading]= useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities : Activity[] = [];
      response.forEach(activity => {
        activity.date =activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(response);
      setLoading(false);
    });
  }, []);

  function handleSelectedActivity(id : String){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? : String){
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  async function handleCreateOrEditActivity(activity : Activity) {
    try{
      setSubmitting(true);
      if (activity.id){
        await agent.Activities.update(activity);
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      }else{
        activity.id = uuid();
        await agent.Activities.create(activity);
        setActivities([...activities, activity]);
      }
      setSelectedActivity(activity);
      setEditMode(false);
    }catch(err){
      console.log(err);
    }
    setSubmitting(false);
  }

  async function handleDeleteActivity(id : string){
    setSubmitting(true);
    await agent.Activities.delete(id);
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);
  }

  if (loading) return <LoadingComponent content='Loading App' />;

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop : '7em' }}>
        <ActivityDasboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
