import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import styled from 'styled-components'
import Card from '@/components/Card'
import StatusDot from '@/components/StatusDot'
import Tag from '@/components/Tag'

const meta: Meta = {
  title: 'Compositions/Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

const Shell = styled.div`
  min-height: 100vh;
  padding: 32px 14px 70px;
  background: ${({ theme }) => theme.color.page};
  font-family: ${({ theme }) => theme.font.body};
`

const Wrap = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const Intro = styled.div`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.color.inkMuted};
  font-size: 13px;
  text-align: center;

  strong {
    display: block;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.color.ink};
    font-size: 18px;
    font-weight: 600;
  }
`

const Frame = styled.section`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.frame};
`

const Panel = styled.div`
  position: relative;
  padding: 26px 24px 28px;
  background: ${({ theme }) => theme.color.panel};
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.mono};
`

const RegistrationMark = styled.div<{ $corner: 'tl' | 'tr' | 'bl' | 'br' }>`
  position: absolute;
  width: 13px;
  height: 13px;
  color: ${({ theme }) => theme.color.ink};
  opacity: 0.4;
  ${({ $corner }) => {
    if ($corner === 'tl') return 'top: 13px; left: 13px;'
    if ($corner === 'tr')
      return 'top: 13px; right: 13px; transform: scaleX(-1);'
    if ($corner === 'bl')
      return 'bottom: 13px; left: 13px; transform: scaleY(-1);'
    return 'bottom: 13px; right: 13px; transform: scale(-1, -1);'
  }}

  svg {
    width: 100%;
    height: 100%;
  }
`

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(27, 32, 39, 0.1);
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.brand};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.04em;
`

const BrandDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.accentDot};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.color.accentSoft};
`

const Subtitle = styled.div`
  margin-top: 4px;
  margin-left: 16px;
  color: ${({ theme }) => theme.color.inkMuted};
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const GaugeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`

const GaugeHousing = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.gaugeHousing};
  box-shadow: ${({ theme }) => theme.shadow.gaugeHousing};
`

const GaugeFace = styled.div`
  position: relative;
  width: 47px;
  height: 47px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.gaugeFace};
  box-shadow: ${({ theme }) => theme.shadow.gaugeFace};
`

const GaugeGlass = styled.div`
  position: absolute;
  top: 2px;
  left: 4px;
  width: 26px;
  height: 13px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.glassHighlight};
  filter: blur(1px);
  pointer-events: none;
`

const Readout = styled.div`
  padding: 5px 10px 4px;
  border-radius: 6px;
  background: ${({ theme }) => theme.gradient.lcd};
  box-shadow: ${({ theme }) => theme.shadow.lcd};
  text-align: right;
`

const ReadoutNumber = styled.div`
  color: ${({ theme }) => theme.color.lcdGreen};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1;
  text-shadow: 0 0 5px ${({ theme }) => theme.color.lcdGreenFaint};
`

const ReadoutLabel = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.color.lcdGreenFaint};
  font-size: 8px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`

const SectionLabel = styled.div`
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

const PullRequestCard = styled(Card)`
  margin-bottom: 8px;
`

const PullRequestTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 9px;
`

const PullRequestTitle = styled.div`
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.body};
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.35;
`

const PullRequestRepo = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.color.inkFaint};
  font-size: 10.5px;
`

const StatusPill = styled.span<{ $variant: 'clear' | 'flagged' }>`
  flex: 0 0 auto;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  background: ${({ theme, $variant }) =>
    $variant === 'clear'
      ? theme.color.status.clearBg
      : theme.color.status.flaggedBg};
  color: ${({ theme, $variant }) =>
    $variant === 'clear'
      ? theme.color.status.clearFg
      : theme.color.status.flaggedFg};
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const LockedRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  padding: 12px 14px;
  border: 1px dashed rgba(27, 32, 39, 0.14);
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(27, 32, 39, 0.025);
`

const LockedLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`

const LockedIcon = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  color: ${({ theme }) => theme.color.inkMuted};
  opacity: 0.45;
`

const LockedName = styled.div`
  color: ${({ theme }) => theme.color.inkMuted};
  font-family: ${({ theme }) => theme.font.body};
  font-size: 12px;
  font-weight: 500;
`

const LockedDescription = styled.div`
  margin-top: 1px;
  color: ${({ theme }) => theme.color.inkFaint};
  font-size: 10.5px;
`

const LockedTag = styled.span`
  flex: 0 0 auto;
  padding: 3px 7px;
  border: 1px solid rgba(27, 32, 39, 0.14);
  border-radius: ${({ theme }) => theme.radius.xs};
  color: ${({ theme }) => theme.color.inkFaint};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
`

const prRows = [
  {
    title: '#47 · Add dropzone resize util',
    repo: 'leaflet-app',
    status: '1 flag',
    variant: 'flagged',
    tags: [
      ['watch', 'a11y · 1 note'],
      ['ok', 'perf'],
      ['ok', 'security'],
      ['ok', 'tests'],
    ],
  },
  {
    title: '#46 · Fix Lighthouse font preload',
    repo: 'leaflet-app',
    status: 'all clear',
    variant: 'clear',
    tags: [
      ['ok', 'a11y'],
      ['ok', 'perf'],
      ['ok', 'security'],
      ['ok', 'tests'],
    ],
  },
  {
    title: '#12 · Bump eslint config',
    repo: 'foreman',
    status: 'all clear',
    variant: 'clear',
    tags: [
      ['ok', 'a11y'],
      ['ok', 'perf'],
      ['ok', 'security'],
      ['ok', 'tests'],
    ],
  },
] as const

const lockedRows = [
  ['Repo Janitor', 'Nightly dependency & Lighthouse sweep', 'v2', 'lock'],
  ['Codebase Archaeology', 'On-demand repo explainer', 'v3', 'clock'],
] as const

const RegistrationMarks = () => (
  <>
    {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
      <RegistrationMark key={corner} $corner={corner}>
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M0,5 V0 H5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </RegistrationMark>
    ))}
  </>
)

const Gauge = () => (
  <GaugeWrap>
    <GaugeHousing>
      <GaugeFace>
        <GaugeGlass />
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          style={{ position: 'absolute', top: 0, left: 0 }}
          aria-hidden="true"
        >
          <circle
            cx="23.5"
            cy="23.5"
            r="18"
            fill="none"
            stroke="rgba(27,32,39,0.14)"
            strokeWidth="1"
          />
          <line
            x1="23.5"
            y1="23.5"
            x2="23.5"
            y2="7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="23.5" cy="23.5" r="2.6" fill="currentColor" />
        </svg>
      </GaugeFace>
    </GaugeHousing>
    <Readout>
      <ReadoutNumber>2/3</ReadoutNumber>
      <ReadoutLabel>all clear</ReadoutLabel>
    </Readout>
  </GaugeWrap>
)

const LockedGlyph = ({ type }: { type: 'lock' | 'clock' }) => {
  if (type === 'clock') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    )
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export const ForemanV1: Story = {
  render: () => (
    <Shell>
      <Wrap>
        <Intro>
          <strong>Foreman v1</strong>
          PR Review Crew — bezel removed, gauge rescoped
        </Intro>

        <Frame>
          <Panel>
            <RegistrationMarks />

            <Header>
              <div>
                <Brand>
                  <BrandDot />
                  FOREMAN
                </Brand>
                <Subtitle>PR review crew · 3 repos connected</Subtitle>
              </div>
              <Gauge />
            </Header>

            <SectionLabel>pull requests</SectionLabel>

            {prRows.map((row) => (
              <PullRequestCard key={row.title}>
                <PullRequestTop>
                  <div>
                    <PullRequestTitle>{row.title}</PullRequestTitle>
                    <PullRequestRepo>{row.repo}</PullRequestRepo>
                  </div>
                  <StatusPill $variant={row.variant}>{row.status}</StatusPill>
                </PullRequestTop>
                <Tags>
                  {row.tags.map(([variant, label]) => (
                    <Tag key={label}>
                      <StatusDot variant={variant} />
                      {label}
                    </Tag>
                  ))}
                </Tags>
              </PullRequestCard>
            ))}

            <SectionLabel>roadmap</SectionLabel>

            {lockedRows.map(([name, description, version, type]) => (
              <LockedRow key={name}>
                <LockedLeft>
                  <LockedIcon>
                    <LockedGlyph type={type} />
                  </LockedIcon>
                  <div>
                    <LockedName>{name}</LockedName>
                    <LockedDescription>{description}</LockedDescription>
                  </div>
                </LockedLeft>
                <LockedTag>{version}</LockedTag>
              </LockedRow>
            ))}
          </Panel>
        </Frame>
      </Wrap>
    </Shell>
  ),
}
