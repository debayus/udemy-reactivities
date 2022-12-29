import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

export default class ActivityStore{

    activityRegistery = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get activitiesByDate(){
      return Array.from(this.activityRegistery.values()).sort((a,b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupActivities(){
      return Object.entries(
        this.activitiesByDate.reduce((activities, activity) => {
          const date = format(activity.date!, 'dd MM yyyy');
          activities[date] = activities[date] ? [...activities[date], activity] : [activity];
          return activities;
        }, {} as {[key:string] : Activity[]})
      );
    }

    loadActivities = async () => {
      this.setLoadingInitial(true);
      try{
          let response = await agent.Activities.list();
          this.activityRegistery.clear();
          response.forEach(activity => {
              this.setActivity(activity);
          });
          this.setLoadingInitial(false);
      }catch(err){
          this.setLoadingInitial(false);
          console.log(err);
      }
    }

    loadActivity = async (id : string) => {
      let activity = this.getActivity(id);
      if (activity){
        this.selectedActivity = activity;
        return activity;
      }else{
        this.setLoadingInitial(true);
        try{
          activity = await agent.Activities.details(id);
          this.setActivity(activity);
          runInAction(() => this.selectedActivity = activity);
          this.setLoadingInitial(false);
          return activity;
      } catch (err){
          this.setLoadingInitial(false);
          console.log(err);
        }
      }
    };

    private setActivity = (activity : Activity) => {
      activity.date = new Date(activity.date!);
      this.activityRegistery.set(activity.id, activity);
    };

    private getActivity = (id : string) => {
      return this.activityRegistery.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
          await agent.Activities.create(activity);
          runInAction(() => {
            this.activityRegistery.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
          });
        }catch(err){
          console.log(err);
          runInAction(()=>{
            this.loading = false;
          });
        }
      }

      updateActivity = async (activity : Activity) => {
        this.loading = true;
        try{
          await agent.Activities.update(activity);
          runInAction(() => {
            this.activityRegistery.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
          });
        }catch(err){
          console.log(err);
          runInAction(()=>{
            this.loading = false;
          });
        }
      }

      deleteActivity = async (id : string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
              this.activityRegistery.delete(id);
              // if (this.selectedActivity?.id == id) this.cancelSelectActivity();
              this.loading = false;
            });
        }catch(err){
          console.log(err);
          runInAction(()=>{
            this.loading = false;
          });
        }
      }
}