import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormField, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm(){

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title : Yup.string().required('The activity title is required'),
        description : Yup.string().required('The activity description is required'),
        category : Yup.string().required('The activity category is required'),
        date : Yup.string().required('The activity date is required'),
        venue : Yup.string().required('The activity venue is required'),
        city : Yup.string().required('The activity city is required'),
    });

    useEffect(() => {
        if (id){
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity]);

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title:  '',
        date: null,
        description:  '',
        category:  '',
        city:  '',
        venue:  '',
    });

    function handleSubmit(activity : Activity){
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
            <Header content='Activity Details' sub color="teal"/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Title' name='title'/>
                        <MyTextArea rows={3} placeholder='Description' name='description'/>
                        <MySelectInput options={categoryOptions} placeholder='Category'  name='category'/>
                        <MyDateInput 
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <Header content='Location Details' sub color="teal"/>
                        <Field placeholder='City' name='city'/>
                        <Field placeholder='Venue' name='venue'/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid }
                            loading={loading} 
                            floated="right" 
                            positive 
                            type="submit" 
                            content="Submit" 
                        />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});