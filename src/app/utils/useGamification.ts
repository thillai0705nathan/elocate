"use client"
import { useState, useEffect } from "react"

export const useGamification = () => {
    const [points, setPoints] = useState(0)
    const [level, setLevel] = useState("Novice")

    useEffect(() => {
        const savedPoints = localStorage.getItem("ewaste_points")
        if (savedPoints) {
            const p = parseInt(savedPoints)
            setPoints(p)
            updateLevel(p)
        }
    }, [])

    const addPoints = (amount: number) => {
        const newPoints = points + amount
        setPoints(newPoints)
        localStorage.setItem("ewaste_points", newPoints.toString())
        updateLevel(newPoints)
    }

    const updateLevel = (p: number) => {
        if (p > 1000) setLevel("Eco Master")
        else if (p > 500) setLevel("Sustainability Hero")
        else if (p > 200) setLevel("Green Advocate")
        else setLevel("Eco Starter")
    }

    return { points, level, addPoints }
}
