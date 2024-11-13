<!-- TODO: This component is proof-of-concept and will be amended.-->
<template>
    <div>
        <h2>Location List</h2>
        <ul>
            <li 
                v-for="location in locations"
                :key="location.id"
            >
                {{ location.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'LocationList',
        props: {
            locations: {
                type: Array,
                required: true,
            },
        },
    };
</script>