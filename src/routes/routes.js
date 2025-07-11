import { randomUUID } from "node:crypto"
import { Database } from "../db/database.js"
import { buildRoutePath } from "../utils/buildRoutePath.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handle: (req, res) => {
      const { search } = req.query

      const tasks = database.select(
        "tasks",
        search ? { title: search, description: search } : null
      )

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handle: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert("tasks", task)

      return res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Informe um título ou uma descrição para a tarefa!",
          })
        )
      }

      try {
        const [task] = database.select("tasks", { id })
        if (!task) {
          throw new Error("Tarefa não encontrada!")
        }

        database.update("tasks", id, {
          title: title || task.title,
          description: description || task.description,
          updated_at: new Date(),
        })
      } catch (error) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: error.message,
          })
        )
      }

      return res.writeHead(204).end()
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handle: (req, res) => {
      const { id } = req.params

      try {
        const [task] = database.select("tasks", { id })
        if (!task) {
          throw new Error("Tarefa não encontrada!")
        }

        const isTaskCompleted = !!task.completed_at
        const completed_at = isTaskCompleted ? null : new Date()

        database.update("tasks", id, {
          completed_at,
        })
      } catch (error) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: error.message,
          })
        )
      }

      return res.writeHead(204).end()
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params

      try {
        database.delete("tasks", id)
      } catch (error) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: error.message,
          })
        )
      }

      return res.writeHead(204).end()
    },
  },
]
