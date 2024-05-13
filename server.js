
const app = express();
const port = process.env.PORT || 3000; 

app.use(static(join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
