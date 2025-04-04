import express from "express";

const app = express();
app.use(express.json());

const tasks = [
    { name: 'Adam', task: 'hoovering', isDone: false },
    { name: 'Bea', task: 'wateringhoovering', isDone: true },
    { name: 'Cloe', task: 'dog walking', isDone: false },
];

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= tasks.length) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(tasks[id]);
});

app.post('/tasks', (req, res) => {
    const { name, task, isDone } = req.body;
    if (!name || !task || isDone === undefined) {
        return res.status(400).json({ message: "Missing some data" });
    }
    const newTask = { name, task, isDone };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= tasks.length) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const { name, task, isDone } = req.body;
    if (!name || !task || isDone === undefined) {
        return res.status(400).json({ message: "Missing some data" });
    }
    tasks[id] = { name, task, isDone };
    res.status(200).json(tasks[id]);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= tasks.length) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(id, 1);
    res.status(200).json({ message: 'Delete successful' });
});

app.listen(3000, () => {
    console.log('Server runs on port 3000');
});
