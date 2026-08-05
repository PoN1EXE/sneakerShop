import React, { Component } from 'react'

export class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Ошибка:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Что-то пошло не так...</h1>
          <button aria-label='Вернуться на главную' onClick={() => (window.location.href = '/')}>
            На главную
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
