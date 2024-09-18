import {useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {useRouter} from "next/router";
import {useState} from "react";
import {Checkbox, CheckboxGroup, Slider} from "@nextui-org/react";

export default function Quiz() {
    const router = useRouter();
    const currentUser = useAppSelector(selectCurrentUser);
    const [form, setForm] = useState<any>({});

    return (
        <>
            <h2>Welcome to our Plant matching quiz!</h2>
            <h3>Feel free to leave any questions you want blank, they won&apos;t be included in the matching algorithm.</h3>
            <FormWizard color="#55BC79">
                <FormWizard.TabContent title="Edible?" icon="fa fa-plate-wheat">
                    <h3>Do you want to be able to eat your plant?</h3>
                    <CheckboxGroup
                        orientation="horizontal"
                        color="secondary"
                        value={form.edible}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                edible: value.length > 1 ? value.filter((item) => !form.edible.includes(item)) : value
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
                        value={form.poisonous}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                poisonous: value.length > 1 ? value.filter((item) => !form.poisonous.includes(item)) : value
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
                        value={form.lifecycle}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                lifecycle: value.length > 1 ? value.filter((item) => !form.lifecycle.includes(item)) : value
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
                    value={form.watering}
                    className="place-items-center"
                    onChange={(value) => {
                        setForm({
                            ...form,
                            watering: value.length > 1 ? value.filter((item) => !form.watering.includes(item)) : value
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
                        value={form.sunlight}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                sunlight: value.length > 1 ? value.filter((item) => !form.sunlight.includes(item)) : value
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
                        value={form.indoors}
                        className="place-items-center"
                        onChange={(value) => {
                            setForm({
                                ...form,
                                indoors: value.length > 1 ? value.filter((item) => !form.indoors.includes(item)) : value
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
                            value={form.hardiness}
                            className="max-w-md"
                            showSteps={true}
                            onChange={(value) => {
                                setForm({
                                    ...form,
                                    hardiness: value
                                })
                            }}
                        />
                    </div>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Submit" icon="fa fa-paper-plane">
                    <h3>Last Tab</h3>
                    <p> Yuhuuu! This seems pretty damn simple</p>
                </FormWizard.TabContent>
            </FormWizard>
            <style>{`@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");`}</style>
        </>
    );
}
