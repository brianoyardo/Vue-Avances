import { reactive } from "vue";
export const store = reactive({
    count: [],
    increment(o){
        this.count.push(o)
    }
})