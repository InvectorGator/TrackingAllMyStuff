import expressApp from './expressApp.js'

const PORT = process.env.PORT || 5025;
expressApp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
