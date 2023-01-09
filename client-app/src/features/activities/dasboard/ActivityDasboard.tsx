import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";

export default observer(function ActivityDasboard(){

    const { activityStore } = useStore();
    const { loadActivities , activityRegistery } = activityStore;

    useEffect(() => {
        if (activityRegistery.size === 0){
            loadActivities();
        }
    }, [loadActivities, activityRegistery.size]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Activities...' />;

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilter />
            </Grid.Column>
        </Grid>
    );
});