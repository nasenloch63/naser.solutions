"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { LegalModal, type LegalModalType } from "@/components/legal-modal"

interface LegalModalContextType {
  openModal: (type: LegalModalType) => void
  closeModal: () => void
  activeModal: LegalModalType
}

const LegalModalContext = createContext<LegalModalContextType | undefined>(undefined)

export function LegalModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<LegalModalType>(null)

  const openModal = useCallback((type: LegalModalType) => {
    setActiveModal(type)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <LegalModalContext.Provider value={{ openModal, closeModal, activeModal }}>
      {children}
      <LegalModal type={activeModal} onClose={closeModal} />
    </LegalModalContext.Provider>
  )
}

export function useLegalModal() {
  const context = useContext(LegalModalContext)
  if (!context) {
    throw new Error("useLegalModal must be used within a LegalModalProvider")
  }
  return context
}
