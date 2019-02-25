<template>
    <div class="label-width pr-2 pt-3 position-absolute">
        <div>
            <span class="font-weight-bold">{{ label }}</span> 
            <small class="badge text-danger border border-danger mx-2" v-if="required">wajib</small>
        </div>
        <small class="hidden-xs-only">{{ labelInfo }}</small>
    </div>
</template>

<script>
export default {
    name: 'LabelFormItem',
    props: {
        label: {
            default: '',
            type: String,
        },
        required: {
            default: false,
            type: Boolean,
        },
        labelInfo: {
            default: '',
            type: String,
        },
    }
}
</script>
<style scoped>
.label-width {
    width: 250px;
    line-height: 100% !important;
    left: 0; margin-left: -260px;
}
small {
    margin-top: -30px !important;
}
</style>

