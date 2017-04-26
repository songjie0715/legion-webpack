<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title">Form</h1>
        </div>
        <div class="main-content">
            <div class="row">
                <div class="col-sm-12 mb-3">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Inline Form</h5>
                        </div>
                        <div class="card-block">
                            <vue-form
                                :model="inlineForm"
                                class="form-inline"
                            ></vue-form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-header no-border">
                            <h5 class="card-title">Form Components</h5>
                            <p class="card-text">Reset FormData after 3 second</p>
                        </div>
                        <div class="card-block">
                            <vue-form
                                :model="formModel"
                                @submit="submit"
                                ref="form"
                                :layout="{grid: true}"
                            >
                            </vue-form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-header no-border">
                            <h5 class="card-title">Initialize Values And Validation</h5>
                        </div>
                        <div class="card-block">
                            <vue-form
                                ref="createForm"
                                :model="formModelWithInitValue"
                                :values="initValues"
                            >
                            </vue-form>
                        </div>
                        <div class="card-footer">
                            <div class="actions">
                                <button class="btn btn-primary" :disabled="!formIsValid" :class="{disabled: !formIsValid}" @click="create">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import vueForm from '../../../../components/form/form.vue';
    import {
        COMPONENT,
        SUBMIT_BUTTON,
        RESET_BUTTON,
        RESTORE_BUTTON,
        get,
        FormModel
    } from '../../../../components/form';
    import {baseFields, baseFieldsData} from '../../data/formFields';
    import {delay} from 'helper.js';
    import LibraryService from '../../services/LibraryService';
    import ModelService from '../../../../services/ModelService';

    export default {
        name: 'FormView',
        components: {
            vueForm
        },
        data(){
            this.timer = null;

            return {
                inlineForm: FormModel.create({
                    fields: [{
                        label: 'Name',
                        name: 'name',
                        type: COMPONENT.INPUT,
                        value: 'languid'
                    }, {
                        label: 'Type',
                        name: 'type',
                        type: COMPONENT.SELECT,
                        value: 1,
                        options: {
                            noEmpty: true,
                            items: [{
                                text: 'A',
                                value: 1
                            }, {
                                text: 'B',
                                value: 2
                            }]
                        }
                    }, get(SUBMIT_BUTTON, {
                        options: {
                            text: 'Search'
                        }
                    })]
                }),
                formModel: FormModel.create({
                    fields: baseFields,
                    events: {
                        mounted(){
                            this.timer = delay(()=>{
                                this.setFormData(baseFieldsData);
                            }, 3000);
                        }
                    }
                }),
                initValues: {
                    name: 'passenger-flow analysis',
                    library: [1,2],
                    type: 2
                },
                formIsValid: false,
                formModelWithInitValue: FormModel.create({
                    fields: [{
                        name: 'name',
                        label: 'Name',
                        type: COMPONENT.INPUT,
                        rules: {
                            required: true
                        },
                        options: {
                            addon: {
                                left: ['Prefix'],
                                right: ['Suffix']
                            }
                        }
                    }, {
                        name: 'library',
                        label: 'Support Library(Remote Options)',
                        type: COMPONENT.CHECKBOX_GROUP,
                        rules: {
                            range: [1,2]
                        },
                        options: {
                            items(){
                                return LibraryService.fetch().then(data=>{
                                    console.log(data);
                                   return data.map(o=>{
                                       return {
                                           text: o.name,
                                           value: o.id
                                       }
                                   })
                                });
                            }
                        }
                    }, {
                        name: 'type',
                        label: 'Select Type',
                        type: COMPONENT.RADIO_GROUP,
                        class: 'limit-height-100',
                        options: {
                            items: [{
                                value: 1,
                                text: 'Bar Chart'
                            }, {
                                value: 2,
                                text: 'Column Chart'
                            }, {
                                value: 3,
                                text: 'Pie Chart'
                            }, {
                                value: 4,
                                text: 'Stacked column'
                            }, {
                                value: 5,
                                text: 'Donut Pie'
                            }, {
                                value: 6,
                                text: 'Line Series'
                            }, {
                                value: 7,
                                text: 'Area'
                            }]
                        }
                    }, {
                        name: 'assist',
                        label: 'Command',
                        hint: 'this field will be ignored',
                        type: COMPONENT.INPUT,
                        value: '11',
                        ignore: true
                    }],
                    events: {
                        submit(fd){
                            console.log(fd);
                        }
                    }
                })
            }
        },
        beforeDestroy(){
            clearTimeout(this.timer);
            this.timer = null;
        },
        methods: {
            submit(fd){
                console.log(fd);
            },
            create(){
                this.$refs.createForm.submit();
            }
        }
    }
</script>