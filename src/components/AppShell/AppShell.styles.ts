import styled from 'styled-components'

export const Shell = styled.div`
  min-height: 100vh;
  padding: 32px 14px 70px;
  background: ${({ theme }) => theme.color.page};
  font-family: ${({ theme }) => theme.font.body};
`

export const Wrap = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const Frame = styled.section`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.frame};
`

export const Panel = styled.div`
  position: relative;
  padding: 26px 24px 28px;
  background: ${({ theme }) => theme.color.panel};
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.mono};
`

export const PanelHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(27, 32, 39, 0.1);
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.brand};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.04em;
`

export const BrandDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.accentDot};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.color.accentSoft};
`

export const Subtitle = styled.div`
  margin-top: 4px;
  margin-left: 16px;
  color: ${({ theme }) => theme.color.inkMuted};
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 18px 0 10px;
  color: ${({ theme }) => theme.color.inkFaint};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(27, 32, 39, 0.09);
  }
`
