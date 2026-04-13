# OS Scheduling Simulator

<div align="center">
  
  ![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
  ![Next.js](https://img.shields.io/badge/Next.js-15.2-black.svg)
  ![React](https://img.shields.io/badge/React-19-blue.svg)
  
  **An interactive, professional-grade CPU scheduling algorithm visualization tool**

</div>

---

## 📖 Overview

The OS Scheduling Simulator is an advanced educational tool designed to help students and professionals understand CPU scheduling algorithms through interactive visualizations. Built with Next.js 15 and React 19, it provides real-time Gantt charts, performance metrics, and comparative analysis of multiple scheduling algorithms.

## ✨ Features

### 🎯 Core Functionality

- **Multiple Scheduling Algorithms**
  - First Come First Serve (FCFS) - configurable preemptive/non-preemptive
  - Round Robin (RR) with configurable time quantum
  - Shortest Job First (SJF) - configurable preemptive/non-preemptive  
  - Priority Scheduling - configurable min/max priority direction
  - Support for both preemptive and non-preemptive modes

- **Interactive Visualizations**
  - Real-time Gantt chart with zoom controls
  - Queue animation with step-by-step playback
  - Performance metrics dashboard with charts
  - Process timeline visualization

- **Performance Analytics**
  - Average waiting time
  - Average turnaround time
  - Average response time
  - CPU utilization percentage
  - Throughput calculation
  - Best/worst process identification

### 🎨 User Experience

- **Modern UI/UX**
  - 🌓 Dark mode support with system preference detection
  - 📱 Fully responsive design for mobile, tablet, and desktop
  - ✨ Smooth animations and transitions
  - ♿ Accessible components (WCAG compliant)
  - 🎨 Professional color scheme with OKLch colors

- **Productivity Features**
  - ⌨️ Keyboard shortcuts for common actions
  - 📥 Import/Export process configurations (JSON)
  - 📊 Export results (JSON/CSV formats)
  - 🎲 Sample data loading for quick testing
  - ✅ Real-time validation and error feedback
  - 🔔 Toast notifications for user actions

- **Professional Tools**
  - 🔬 Algorithm comparison mode
  - 📈 Side-by-side performance analysis
  - 📚 Contextual help and documentation
  - 🎯 Performance rating system

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/os-scheduling-simulator.git
   cd Scheduling_Algorithm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📚 Documentation

### How to Use

#### 1. Add Processes

- Use the "Add New Process" form to input process details (ID, Arrival Time, Burst Time, Priority)
- Click "Load Sample" for pre-configured test data
- Import from JSON file for batch operations
- Edit or delete existing processes inline

#### 2. Select Algorithm

- Choose from FCFS, RR, SJF, or Priority scheduling
- Configure algorithm parameters:
  - **Preemptive Mode**: Enable/disable process interruption
  - **Time Quantum**: For Round Robin (1-10 units)
  - **Priority Direction**: Min or Max as highest priority
- View algorithm description, complexity, and best use cases

#### 3. Run Simulation

- Click "Run Simulation" or press `Ctrl+Enter`
- View results in multiple tabs:
  - **Gantt Chart**: Visual timeline with zoom controls
  - **Queue Animation**: Step-by-step process execution
- Analyze metrics in the performance dashboard
- Export results in JSON or CSV format

#### 4. Compare Algorithms

- Switch to "Algorithm Comparison" tab
- Select multiple algorithms to compare
- View side-by-side performance metrics
- Get recommendations for different use cases

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Run simulation |
| `Ctrl+L` | Load sample data |
| `Ctrl+E` | Export results |
| `Ctrl+K` | Show keyboard shortcuts |
| `Space` | Play/Pause animation |
| `R` | Reset animation |
| `←/→` | Step backward/forward in animation |

### Performance Metrics Explained

- **Waiting Time**: Time a process spends in the ready queue waiting for CPU
- **Turnaround Time**: Total time from arrival to completion (includes waiting + execution)
- **Response Time**: Time from arrival to first execution (important for interactive systems)
- **CPU Utilization**: Percentage of time CPU is actively executing processes (vs idle time)
- **Throughput**: Number of processes completed per time unit

### Algorithm Details

#### First Come First Serve (FCFS)
- **Type**: Configurable (Preemptive/Non-preemptive)
- **Complexity**: Simple
- **Best for**: Simple batch systems with predictable workloads
- **Pros**: Fair, simple implementation
- **Cons**: Can suffer from convoy effect

#### Round Robin (RR)
- **Type**: Preemptive with time quantum
- **Complexity**: Medium
- **Best for**: Interactive systems, time-sharing environments
- **Pros**: Fair CPU sharing, good responsiveness
- **Cons**: Higher context switching overhead with small quantum

#### Shortest Job First (SJF)
- **Type**: Configurable (Preemptive/Non-preemptive)
- **Complexity**: Medium
- **Best for**: Batch systems with known job times
- **Pros**: Minimizes average waiting time
- **Cons**: Requires knowledge of burst times, can cause starvation

#### Priority Scheduling
- **Type**: Configurable (Preemptive/Non-preemptive)
- **Complexity**: Medium
- **Best for**: Systems with process importance hierarchy
- **Pros**: Flexible, supports different priority levels
- **Cons**: Can cause starvation of low-priority processes

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15.2 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design tokens

### UI Components
- **Component Library**: Radix UI primitives
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Theme**: next-themes for dark mode support
- **Notifications**: Sonner for toast notifications

### Development Tools
- **Build Tool**: Next.js compiler
- **Linting**: ESLint
- **Package Manager**: npm/pnpm/yarn

## 📁 Project Structure

```
Scheduling_Algorithm/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles with design tokens
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main application page
├── components/              # React components
│   ├── ui/                  # Radix UI base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   └── ... (50+ components)
│   ├── algorithm-comparison.tsx    # Multi-algorithm comparison
│   ├── algorithm-selector.tsx      # Algorithm configuration
│   ├── gantt-chart.tsx            # Visual timeline
│   ├── help-dialog.tsx            # Help & documentation
│   ├── process-input.tsx          # Process management
│   ├── queue-animation.tsx        # Step-by-step animation
│   ├── results-dashboard.tsx      # Performance metrics
│   ├── theme-provider.tsx         # Dark mode provider
│   └── theme-toggle.tsx           # Theme switcher
├── hooks/                   # Custom React hooks
│   ├── use-keyboard-shortcuts.ts  # Keyboard shortcut handler
│   ├── use-mobile.ts             # Mobile detection
│   └── use-toast.ts              # Toast notifications
├── lib/                     # Core business logic
│   ├── algorithms/          # Scheduling algorithm implementations
│   │   ├── fcfs.ts         # First Come First Serve
│   │   ├── feedback.ts      # Multi-level Feedback Queue
│   │   ├── feedback-varying.ts # Feedback with varying quantum
│   │   ├── priority.ts      # Priority Scheduling
│   │   ├── round-robin.ts   # Round Robin
│   │   ├── spn.ts          # Shortest Process Next
│   │   └── srt.ts          # Shortest Remaining Time
│   ├── scheduler.ts         # Main scheduler orchestrator
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
└── public/                  # Static assets
    └── *.svg, *.png        # Images and icons
```

## 🎯 Key Implementation Details

### Algorithm Implementation
Each scheduling algorithm is implemented as a pure function that:
1. Takes an array of processes and configuration
2. Returns a `SchedulingResult` with:
   - Processed data (completion times, waiting times, etc.)
   - Gantt chart items for visualization
   - Average metrics (waiting, turnaround, response times)

### Type Safety
Full TypeScript support with comprehensive type definitions:
- `Process`: Process data structure
- `SchedulingResult`: Algorithm output format
- `GanttItem`: Timeline visualization data
- `QueueSnapshot`: Animation frame data
- `AlgorithmConfig`: Configuration options

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes with clear commit messages
4. Test your changes thoroughly
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request with a clear description

### Development Guidelines
- Follow the existing code style and conventions
- Add TypeScript types for all new code
- Test on multiple screen sizes and browsers
- Update documentation for new features

## 🐛 Known Issues & Future Enhancements

### Planned Features
- [ ] Additional scheduling algorithms (MLFQ, EDF, etc.)
- [ ] Save/load simulation sessions
- [ ] PDF export for results
- [ ] Multi-core CPU simulation
- [ ] Process arrival time animation
- [ ] Advanced statistics and insights

### Known Limitations
- Feedback and Feedback-Varying algorithms are implemented but not exposed in UI
- Large number of processes (>50) may affect animation performance
- CSV export format is simplified (no Gantt chart data)

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 OS Scheduling Simulator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org) - The React Framework
- UI components from [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- Styling with [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Icons by [Lucide](https://lucide.dev/) - Beautiful, consistent icons
- Charts powered by [Recharts](https://recharts.org/) - Composable charting library
- Fonts by [Vercel](https://vercel.com/font) - Geist Sans & Geist Mono

## 📞 Support & Contact

If you need help or have questions:

- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/os-scheduling-simulator/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/yourusername/os-scheduling-simulator/discussions)
- 📖 **Documentation**: Built-in help dialog (press `?` or click help icon)
- 📧 **Email**: support@example.com

## 🌟 Show Your Support

If this project helped you learn about CPU scheduling algorithms, please give it a ⭐️!

---

<div align="center">
  

  
  [Report Bug](https://github.com/yourusername/os-scheduling-simulator/issues) · [Request Feature](https://github.com/yourusername/os-scheduling-simulator/issues)
  
</div>


<!-- GitHub Refresh -->
