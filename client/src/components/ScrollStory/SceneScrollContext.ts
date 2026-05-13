"use client"

import { createContext } from "react"

export type SceneSubscribe = (cb: (progress: number) => void) => () => void

const noop: SceneSubscribe = () => () => {}

export const SceneScrollContext = createContext<SceneSubscribe>(noop)
