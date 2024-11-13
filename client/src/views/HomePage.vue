<!-- TODO: This page is proof-of-concept and will be amended.-->

<template>
    <div>
        <LocationList :locations="locations" />
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import LocationList from '../components/LocationList.vue';

    export default {
        name: 'HomePage',
        components: {
            LocationList,
        },
        setup() {
            const locations = ref([]);
            onMounted(async () => {
                try {
                    const response = await axios.get('/api/locations');
                    locations.value = response.data;
                } catch (error) {
                    console.error('Error fetching locations: ', error);
                }
            });

            return { locations: locations };
        },
    };
</script>