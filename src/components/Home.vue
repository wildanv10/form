<template>
<div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="260px" class="demo-ruleForm">
        <!-- SECTION INFO -->
        <el-card class="my-2">
            <el-form-item prop="images">
                <label-form-item
                    label="Gambar Trip"
                    labelInfo="(Ukuran masing-masing Gambar Trip maksimal 2MB)"
                    :required="true"
                ></label-form-item>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item prop="name">
                <label-form-item
                    label="Nama Trip"
                    labelInfo="Tulis nama trip sesuai jenis dan rincian trip."
                    :required="true"
                ></label-form-item>
                <el-input v-model="ruleForm.name" name="name"></el-input>
            </el-form-item>

            <el-form-item prop="category">
                <label-form-item
                    label="Kategori"
                    :required="true"
                ></label-form-item>
                <el-select
                    v-model="ruleForm.category"
                    default-first-option
                    placeholder="-- Pilih Kategori --"
                    name="category"
                    class="position-left w-60"
                >
                    <el-option
                        v-for="item in categorylists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="tags">
                <label-form-item
                    label="Tag"
                    :required="true"
                ></label-form-item>
                <el-select
                    v-model="ruleForm.tags"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="-- Pilih Tag --"
                    name="tags"
                    class="position-left w-60"
                >
                    <el-option
                        v-for="item in taglists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-card>

        <!-- SECTION PRICE -->
        <el-card class="my-2">
            <el-form-item prop="unit">
                <label-form-item
                    label="Satuan Harga"
                    :required="true"
                ></label-form-item>
                <el-select
                    v-model="ruleForm.unit"
                    default-first-option
                    placeholder="-- Pilih Satuan Harga --"
                    name="unit"
                    class="position-left w-60"
                >
                    <el-option label="Orang" value="orang">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="price">
                <label-form-item
                    label="Harga Trip"
                    :required="true"
                ></label-form-item>
                <el-input
                    type="number"
                    class="col-4 px-0"
                    min="1" 
                    max="999999999" 
                    v-model.number="ruleForm.price" 
                    name="price"
                    ref="price">
                </el-input>
            </el-form-item>
            
            <el-form-item prop="termin">
                <label-form-item
                    label="Pembayaran Termin"
                    :required="true"
                ></label-form-item>
                <el-select
                    v-model="ruleForm.termin"
                    default-first-option
                    placeholder="-- Pilih Pembayaran Termin --"
                    name="termin"
                    class="position-left w-60"
                >
                    <el-option label="Termin Diakhir" value="4">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- DISCOUNT START -->
            <el-form-item v-if="ruleForm.price">
                <el-switch
                    v-model="ruleForm.hasDiscount"
                    active-text="Memiliki Diskon">
                </el-switch>
            </el-form-item>

            <div v-if="ruleForm.hasDiscount">
                <el-form-item prop="discountPrice">
                    <label-form-item
                        label="Harga Diskon"
                        :required="true"
                    ></label-form-item>
                    <el-input
                        type="number"
                        class="col-4 px-0"
                        min="1" 
                        :max="ruleForm.price"
                        v-model.number="ruleForm.discountPrice" 
                        name="discountPrice">
                    </el-input>
                </el-form-item>

                <el-form-item prop="discountDate">
                    <el-date-picker
                        v-model="ruleForm.discountDate"
                        type="datetime"
                        name="discountDate"
                        placeholder="Tanggal Diskon Berakhir"
                        format="d MMM yyyy HH:mm:ss"
                        default-time="23:59:59">
                    </el-date-picker>
                </el-form-item>
            </div>
            <!-- DISCOUNT END -->
            <el-col class="pb-3 text-muted">Atur Pengaturan Termin yang akan diterapkan pada trip Anda.
                Pengaturan ini akan mempengaruhi bagaimana Holahalo meneruskan pembayaran dari pembeli kepada Anda.
                Termin ini berguna sebagai informasi untuk kenyamanan pembeli.
                Termin diskon ini akan berlaku selama trip memiliki status diskon menyala, dan akan menimpa opsi termin pada produk standar.
            </el-col>
        </el-card>

        <!-- <el-form-item label="Activity zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Activity zone" name="regional">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Activity time" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item label="Instant delivery" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="Online activities" name="type"></el-checkbox>
                <el-checkbox label="Promotion activities" name="type"></el-checkbox>
                <el-checkbox label="Offline activities" name="type"></el-checkbox>
                <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="Sponsorship"></el-radio>
                <el-radio label="Venue"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="Activity form" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item> -->

        <el-form-item class="d-flex justify-content-end p-3">
            <el-button >Batal</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">Simpan</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import LabelFormItem from './LabelFormItem.vue'

export default {
    components: { LabelFormItem },
    name: 'Home',
    props: {
        msg: String
    },
    data() {
        return {
            ruleForm: {
                dialogImageUrl: '',
                dialogVisible: false,
                name: '',
                category: '',
                tags: [],
                unit: '',
                price: 0,
                termin: '',
                hasDiscount: false,
                discountPrice: '',
                discountDate: '',
                // region: '',
                // date1: '',
                // date2: '',
                // delivery: false,
                // type: [],
                // resource: '',
                // desc: ''
            },
            categorylists: [
                {
                    value: 'open trip',
                    label: 'Open Trip'
                }, 
                {
                    value: 'private trip',
                    label: 'Private Trip'
                }, 
            ],
            taglists: [
                {
                    value: 'HTML',
                    label: 'HTML'
                }, 
                {
                    value: 'CSS',
                    label: 'CSS'
                }, 
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }
            ],
            rules: {
                name: [
                    { required: true, message: 'Harap masukan nama trip', trigger: 'change' },
                ],
                category: [
                    { required: true, message: 'Harap pilih kategori', trigger: 'change' },
                ],
                tags: [
                    { required: true, message: 'Harap pilih tag', trigger: 'change' },
                ],
                price: [
                    { required: true, message: 'Harap masukan harga trip', trigger: 'change' },
                    { type: 'number', min: 1, message: 'Harga harus lebih 1', trigger: 'change' },
                    { type: 'number', max: 999999999, message: 'Harga harus kurang 1 miliar', trigger: 'change' },
                ],
                unit: [
                    { required: true, message: 'Harap pilih satuan harga', trigger: 'change' },
                ],
                termin: [
                    { required: true, message: 'Harap pilih termin', trigger: 'change' },
                ],
                discountPrice: [
                    { required: true, message: 'Harap masukan harga diskon', trigger: 'change' },
                    { type: 'number', min: 1, message: 'Harga Diskon minimal 1', trigger: 'change' },
                    // { type: 'number', max: this.$$refs.price.value, message: 'Harga Diskon harus kurang dari', trigger: 'change' },
                ],
                discountDate: [
                    { required: true, message: 'Harap masukan tanggal diskon berakhir', trigger: 'change' },
                ],
                // region: [
                //     { required: true, message: 'Please select Activity zone', trigger: 'change' }
                // ],
                // date1: [
                //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                // ],
                // date2: [
                //     { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
                // ],
                // type: [
                //     { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
                // ],
                // resource: [
                //     { required: true, message: 'Please select activity resource', trigger: 'change' }
                // ],
                // desc: [
                //     { required: true, message: 'Please input activity form', trigger: 'blur' }
                // ]
            }
        }
    },
    methods: {
        price() {
            return parseInt(100000)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                    return true
                } else {
                    return false
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        badgeWajib(label) {
            return label + '<span class="badge border border-danger text-danger mx-2">wajib</span>';
        }
    },
    filters: {
        formatMoney: function(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}
</script>

<style scoped>
.position-right {
    right: 0; position: absolute;
}
.w-60 {
    width: 60%; 
}
</style>
