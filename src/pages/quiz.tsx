import {useAppDispatch, useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {useRouter} from "next/router";
import {useState} from "react";
import {Checkbox, CheckboxGroup, Slider} from "@nextui-org/react";
import _ from 'lodash';
import {createQuiz} from "@/state/quiz.reducer";
import {QuizRequest} from "@/models/quiz.model";

export default function Quiz() {
    const router = useRouter();
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<any>({});

    function jsonToOutline (json = {}) {
        const output: React.ReactNode[] = [];

        for (const key in _.pickBy(json, _.identity)) {
            const value = json[key];
            output.push((<li><p><strong>{_.startCase(key)}</strong>{_.isPlainObject(value) ? '' : `: ${_.startCase(value)}`}</p></li>));

            if (_.isPlainObject(value)) {
                const recursiveJson = jsonToOutline(value); // recursively call
                output.push((recursiveJson));
            }
        }
        return <ul>{output}</ul>;
    }

    async function handleComplete(){
        let response = null;
        try {
            let request: QuizRequest = {
                userName: currentUser.userName,
                ...( form.sunlight ? {plantSunlight: form.sunlight} : null),
                ...( form.watering ? {plantWatering: form.watering} : null),
                ...( form.edible ? {edible: form.edible === 'yes'} : null),
                ...( form.poisonous ? {poisonous: form.poisonous === 'yes'} : null),
                ...( form.lifecycle ? {cycle: form.lifecycle} : null),
                ...( form.hardiness ? {hardiness: form.hardiness} : null),
                ...( form.indoors ? {indoor: form.indoor === 'yes'} : null),
            };
            response = await dispatch(createQuiz(request));
            if(response.payload?.status === 200){
                router.push({
                    pathname: "/quiz-details",
                    query: {
                        quizId: response.payload.data.quiz.quizId
                    },
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h2>Welcome to our Plant matching quiz!</h2>
            <FormWizard color="#55BC79" onComplete={handleComplete}>
                <FormWizard.TabContent title="Edible?" icon="fa fa-plate-wheat">
                    <h3>Do you want to be able to eat your plant?</h3>
                    <CheckboxGroup
                        orientation="horizontal"
                        color="secondary"
                        value={[form.edible]}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                edible: value.length > 1 ? value.filter((item) => form.edible !== item)[0] : value[0]
                            })
                        }}
                    >
                        <Checkbox value="yes">Yes</Checkbox>
                        <Checkbox value="no">No</Checkbox>
                    </CheckboxGroup>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Poisonous?" icon="fa fa-skull-crossbones">
                    <h3>Are you comfortable owning a poisonous plant?</h3>
                    <CheckboxGroup
                        orientation="horizontal"
                        color="secondary"
                        value={[form.poisonous]}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                poisonous: value.length > 1 ? value.filter((item) => form.poisonous !== item)[0] : value[0]
                            })
                        }}
                    >
                        <Checkbox value="yes">Yes</Checkbox>
                        <Checkbox value="no">No</Checkbox>
                    </CheckboxGroup>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Lifecycle?" icon="fa fa-arrows-spin">
                    <h3>What is your desired lifecycle for your plant?</h3>
                    <CheckboxGroup
                        orientation="horizontal"
                        color="secondary"
                        value={[form.lifecycle]}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                lifecycle: value.length > 1 ? value.filter((item) => form.lifecycle !== item)[0] : value[0]
                            })
                        }}
                    >
                        <Checkbox value="perennial">Perennial</Checkbox>
                        <Checkbox value="annual">Annual</Checkbox>
                        <Checkbox value="biennial">Biennial</Checkbox>
                        <Checkbox value="biannual">Biannual</Checkbox>
                    </CheckboxGroup>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Watering Obligation?" icon="fa fa-cloud-rain">
                <h3>How much can you water your plant?</h3>
                <CheckboxGroup
                    orientation="horizontal"
                    color="secondary"
                    value={[form.watering]}
                    className="place-items-center"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            watering: value.length > 1 ? value.filter((item) => form.watering !== item)[0] : value[0]
                        })
                    }}
                >
                    <Checkbox value="frequent">Frequent</Checkbox>
                    <Checkbox value="average">Average</Checkbox>
                    <Checkbox value="minimum">Minimum</Checkbox>
                    <Checkbox value="none">None</Checkbox>
                </CheckboxGroup>
            </FormWizard.TabContent>
                <FormWizard.TabContent title="Sunlight Requirements?" icon="fa fa-sun">
                    <h3>How much sun will your plant get?</h3>
                    <CheckboxGroup
                        orientation="horizontal"
                        color="secondary"
                        value={[form.sunlight]}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                sunlight: value.length > 1 ? value.filter((item) => form.sunlight !== item)[0] : value[0]
                            })
                        }}
                    >
                        <Checkbox value="full_shade">Fully Shaded</Checkbox>
                        <Checkbox value="part_shade">Partly Shaded</Checkbox>
                        <Checkbox value="sun-part_shade">Mostly Sunny</Checkbox>
                        <Checkbox value="full_sun">Always in the sun</Checkbox>
                    </CheckboxGroup>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Indoors?" icon="fa fa-house">
                    <h3>Are you looking for an indoors plant?</h3>
                    <CheckboxGroup
                        orientation="horizontal"
                        color="secondary"
                        value={[form.indoors]}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                indoors: value.length > 1 ? value.filter((item) => form.indoors !== item)[0] : value[0]
                            })
                        }}
                    >
                        <Checkbox value="yes">Yes</Checkbox>
                        <Checkbox value="no">No</Checkbox>
                    </CheckboxGroup>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Hardiness?" icon="fa fa-shield">
                    <h3>What hardiness level are you looking for in a plant?</h3>
                    <div className="grid place-items-center">
                        <Slider
                            showTooltip={true}
                            step={1}
                            maxValue={13}
                            minValue={1}
                            value={form.hardiness ? [form.hardiness] : undefined}
                            className="max-w-md"
                            showSteps={true}
                            onChange={(value) => {
                                setForm({
                                    ...form,
                                    hardiness: value[0]
                                })
                            }}
                        />
                    </div>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Submit" icon="fa fa-paper-plane">
                    <h3>Review your answers below:</h3>
                    {_.isEmpty(form) ? <p>No answers detected</p> : jsonToOutline(form)}
                </FormWizard.TabContent>
            </FormWizard>
            <style>{`@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");`}</style>
        </>
    );
}
