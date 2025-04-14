"use client"

import { useState } from "react"
import { FileText, Plus, Calendar, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Note {
  id: string
  text: string
  createdAt: string
  author: {
    name: string
    avatar?: string
  }
}

interface CustomerNotesTabProps {
  customerId: string
}

export default function CustomerNotesTab({ customerId }: CustomerNotesTabProps) {
  const [newNote, setNewNote] = useState("")
  const [tags, setTags] = useState<string[]>(["VIP", "Follow Up"])
  const [newTag, setNewTag] = useState("")

  // In a real app, these would be loaded from your Redux store
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      text: "Customer called asking about their recent order #ORD-1234. Told them it was shipped yesterday and provided tracking information.",
      createdAt: "2023-11-16 14:32",
      author: {
        name: "John Smith",
        avatar: "/abstract-user-icon.png",
      },
    },
    {
      id: "2",
      text: "Customer has requested a demo of our premium features. I've scheduled a call for next Tuesday at 2pm.",
      createdAt: "2023-11-10 09:15",
      author: {
        name: "Sarah Johnson",
      },
    },
  ])

  const suggestedTags = ["Priority", "Support", "Sales Lead", "Returns", "Technical Issue"]

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: String(Date.now()),
      text: newNote,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      author: {
        name: "Current User", // In a real app, this would be the current user
        avatar: "/abstract-user-icon.png",
      },
    }

    setNotes([note, ...notes])
    setNewNote("")
  }

  const handleAddTag = () => {
    if (!newTag.trim() || tags.includes(newTag)) {
      setNewTag("")
      return
    }

    setTags([...tags, newTag])
    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleAddSuggestedTag = (tag: string) => {
    if (tags.includes(tag)) return
    setTags([...tags, tag])
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Customer Tags</h3>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 py-1.5"
                >
                  {tag}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Textarea
                placeholder="Add a new tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="min-h-0 h-9 py-2 resize-none"
              />
              <Button size="sm" onClick={handleAddTag} disabled={!newTag.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {suggestedTags.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm text-gray-500 mb-2 block">Suggested Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags
                    .filter((tag) => !tags.includes(tag))
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer bg-gray-50 hover:bg-gray-100"
                        onClick={() => handleAddSuggestedTag(tag)}
                      >
                        <Plus className="mr-1 h-3 w-3" /> {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Add Note</h3>
        <Card>
          <CardContent className="p-6">
            <Textarea
              placeholder="Type your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                <Plus className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Notes History</h3>
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {note.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{note.author.name}</span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {note.createdAt}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {notes.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notes have been added yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
