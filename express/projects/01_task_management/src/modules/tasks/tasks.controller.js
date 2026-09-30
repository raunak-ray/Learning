export const getTasks = async (req, res) => {
    return res.json({
        message: "Tasks route"
    });
}

export const getTaskById = async (req, res) => {
    const id = req.params.id;

    return res.json({
        message: `Task with id ${id}`,
    });
}

export const createTask = async (req, res) => {
    return res.json({
        message: "Create task",
    });
}

export const updateTask = async (req, res) => {
    const id = req.params.id;
    
    return res.json({
        mesage: `Update task with id ${id}`,
    });
}

export const deleteTask = async (req, res) => {
    const id = req.params.id;

    return res.json({
        message: `Delete task with id ${id}`
    });
}