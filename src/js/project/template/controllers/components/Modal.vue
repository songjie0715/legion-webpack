<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title">Modal</h1>
        </div>
        <div class="main-content">
            <div class="primary-actions">
                <button class="btn btn-primary" @click="$refs.basicModal.show()">Open Modal</button>
                <button class="btn btn-primary" @click="$refs.formModal.show()">Modal With Form</button>
            </div>
        </div>

        <vue-modal
            ref="basicModal"
            :title="'Modal'"
        >
            <div slot="body">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="exampleSelect1">Example select</label>
                    <select class="form-control" id="exampleSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleTextarea">Example textarea</label>
                    <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                    <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input">
                        Check me out
                    </label>
                </div>
            </div>
            <div slot="footer">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </vue-modal>

        <vue-modal
            ref="formModal"
            title="Filter Modal"
            size="lg"
            subtitle="Reset FormData after 3 second"
            icon="home"
            :no-footer="true"
        >
            <div slot="body">
                <vue-form
                    :model="formModel"
                    @submit="submit"
                    ref="form"
                    :layout="{grid: true}"
                >
                </vue-form>
            </div>
        </vue-modal>
    </div>
</template>

<script>
    import vueModal from '../../../../components/modal.vue';
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

    export default {
        name: 'ModalView',
        components: {
            vueModal,
            vueForm
        },
        data(){
            return {
                formModel: FormModel.create({
                    fields: baseFields,
                    events: {
                        mounted(){
                            delay(()=>{
                                this.setFormData(baseFieldsData);
                            }, 3000);
                        }
                    }
                })
            }
        },
        methods: {
            submit(fd){
                return fd;
            }
        }
    }
</script>