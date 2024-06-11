'use client';
import React from 'react';
import {
  EventApi,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  staticEvents: { title: string; start: string; end?: string; allDay?: boolean; description: string; type: string; time: string }[];
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    staticEvents: [
      {
        title: 'My Project',
        start: '2024-06-05',
        description: 'This is the description of my project event.',
        type: 'pending',
        time: '5 hours'
      },
      {
        title: 'test',
        start: '2024-06-05',
        description: 'test purpose.',
        type: 'approved',
        time: '5 hours',
      },
      {
        title: 'Another Project',
        start: '2024-06-10',
        description: 'This is the description of another project event.',
        type: 'approved',
        time: '5 hours',
      },
    ],
  };

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView='dayGridMonth'
            editable={false}  // Disable editing
            selectable={false}  // Disable selecting
            selectMirror={false}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={[...this.state.staticEvents]}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
            eventResizableFromStart={false}  // Disable resizing from start
            eventDurationEditable={false}  // Disable resizing
            eventStartEditable={false}  // Disable drag-and-drop
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        {/* <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div> */}
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Event: ${clickInfo.event.title}\nDescription: ${clickInfo.event.extendedProps.description}`);
  };

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
  const backgroundColor = eventContent.event.extendedProps.type === 'pending' ? 'blue' : 'green';
  const style: React.CSSProperties = {
    backgroundColor,
    borderRadius: '5px',
    color: 'white',
    padding: '5px',
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
  };

  const tooltipContent = `
    <div>
      <strong>${eventContent.event.title}</strong>
    </div>
    <div>
      <em>${eventContent.event.extendedProps.description}</em>
    </div>
    <div>
      <span>Time: ${eventContent.event.extendedProps.time}</span>
    </div>
  `;

  return (
    <div style={style} className="tooltip">
      <div>
        <i>{eventContent.event.title}</i>
      </div>
      <div className="tooltiptext" dangerouslySetInnerHTML={{ __html: tooltipContent }}></div>
    </div>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}
