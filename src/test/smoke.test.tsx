import { render, screen } from '@testing-library/react'

test('renders a paragraph into the document', () => {
  render(<p>hello</p>)
  expect(screen.getByText('hello')).toBeInTheDocument()
})
