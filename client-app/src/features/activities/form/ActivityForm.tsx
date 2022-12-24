import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormField, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { ErrorMessage, Field, Formik } from "formik";
import { values } from "mobx";
import * as Yup from "yup";

export default observer(function ActivityForm(){

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title : Yup.string().required('the activity title is required')
    });

    useEffect(() => {
        if (id){
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity]);

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title:  '',
        date:  '',
        description:  '',
        category:  '',
        city:  '',
        venue:  '',
    });

    function handleSubmit(){
        if (!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
        }else{
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
        }
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name] : value});
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Segment clearing>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => console.log(values)}>
                {({values : activity, handleChange, handleSubmit}) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <FormField>
                            <Field placeholder='Title' name='title' />
                            <ErrorMessage name="title" render={error => <Label basic color='red' context={error} /> } />
                        </FormField>
                        <Field placeholder='Title' name='title' />
                        <Field placeholder='Description' name='description'/>
                        <Field placeholder='Category'  name='category'/>
                        <Field type="date" placeholder='Date' name='date'/>
                        <Field placeholder='City' name='city'/>
                        <Field placeholder='Venue' name='venue'/>
                        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});