/*! clndr.min.js v1.5.1 2019-11-27 */

!function(t){"function"==typeof define&&define.amd?define(["jquery","moment"],t):"object"==typeof exports?t(require("jquery"),require("moment")):t(jQuery,moment)}(function(p,u){var a={events:[],ready:null,extras:null,render:null,moment:null,weekOffset:0,constraints:null,forceSixRows:null,selectedDate:null,doneRendering:null,daysOfTheWeek:null,multiDayEvents:null,startWithMonth:null,dateParameter:"date",template:"<div class='clndr-controls'><div class='clndr-control-button'><span class='clndr-previous-button'>previous</span></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'>next</span></div></div><table class='clndr-table' border='0' cellspacing='0' cellpadding='0'><thead><tr class='header-days'><% for(var i = 0; i < daysOfTheWeek.length; i++) { %><td class='header-day'><%= daysOfTheWeek[i] %></td><% } %></tr></thead><tbody><% for(var i = 0; i < numberOfRows; i++){ %><tr><% for(var j = 0; j < 7; j++){ %><% var d = j + i * 7; %><td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %></div></td><% } %></tr><% } %></tbody></table>",showAdjacentMonths:!0,trackSelectedDate:!1,formatWeekdayHeader:null,adjacentDaysChangeMonth:!1,ignoreInactiveDaysInSelection:null,lengthOfTime:{days:null,interval:1,months:null},clickEvents:{click:null,today:null,nextYear:null,nextMonth:null,nextInterval:null,previousYear:null,onYearChange:null,previousMonth:null,onMonthChange:null,previousInterval:null,onIntervalChange:null},targets:{day:"day",empty:"empty",nextButton:"clndr-next-button",todayButton:"clndr-today-button",previousButton:"clndr-previous-button",nextYearButton:"clndr-next-year-button",previousYearButton:"clndr-previous-year-button"},classes:{past:"past",today:"today",event:"event",inactive:"inactive",selected:"selected",lastMonth:"last-month",nextMonth:"next-month",adjacentMonth:"adjacent-month"}};function n(t,e){var n,s;this.element=t,this.options=p.extend(!0,{},a,e),this.options.moment&&(u=this.options.moment),this.validateOptions(),this.constraints={next:!0,today:!0,previous:!0,nextYear:!0,previousYear:!0},this.options.events.length&&(this.options.multiDayEvents?this.options.events=this.addMultiDayMomentObjectsToEvents(this.options.events):this.options.events=this.addMomentObjectToEvents(this.options.events)),this.options.lengthOfTime.months||this.options.lengthOfTime.days?this.options.lengthOfTime.months?(this.options.lengthOfTime.days=null,this.options.lengthOfTime.startDate?this.intervalStart=u(this.options.lengthOfTime.startDate).startOf("month"):this.options.startWithMonth?this.intervalStart=u(this.options.startWithMonth).startOf("month"):this.intervalStart=u().startOf("month"),this.intervalEnd=u(this.intervalStart).add(this.options.lengthOfTime.months,"months").subtract(1,"days"),this.month=this.intervalStart.clone()):this.options.lengthOfTime.days&&(this.options.lengthOfTime.startDate?this.intervalStart=u(this.options.lengthOfTime.startDate).startOf("day"):this.intervalStart=u().weekday(this.options.weekOffset).startOf("day"),this.intervalEnd=u(this.intervalStart).add(this.options.lengthOfTime.days-1,"days").endOf("day"),this.month=this.intervalStart.clone()):(this.month=u().startOf("month"),this.intervalStart=u(this.month),this.intervalEnd=u(this.month).endOf("month")),this.options.startWithMonth&&(this.month=u(this.options.startWithMonth).startOf("month"),this.intervalStart=u(this.month),this.intervalEnd=this.options.lengthOfTime.days?u(this.month).add(this.options.lengthOfTime.days-1,"days").endOf("day"):u(this.month).endOf("month")),this.options.constraints&&(this.options.constraints.startDate&&(s=u(this.options.constraints.startDate),this.options.lengthOfTime.days?(this.intervalStart.isBefore(s,"week")&&(this.intervalStart=s.startOf("week")),(this.intervalStart.diff(this.intervalEnd,"days")<this.options.lengthOfTime.days||this.intervalEnd.isBefore(this.intervalStart))&&(this.intervalEnd=u(this.intervalStart).add(this.options.lengthOfTime.days-1,"days").endOf("day"),this.month=this.intervalStart.clone())):(this.intervalStart.isBefore(s,"month")&&(this.intervalStart.set("month",s.month()).set("year",s.year()),this.month.set("month",s.month()).set("year",s.year())),this.intervalEnd.isBefore(s,"month")&&this.intervalEnd.set("month",s.month()).set("year",s.year()))),this.options.constraints.endDate&&(n=u(this.options.constraints.endDate),this.options.lengthOfTime.days?this.intervalStart.isAfter(n,"week")&&(this.intervalStart=u(n).endOf("week").subtract(this.options.lengthOfTime.days-1,"days").startOf("day"),this.intervalEnd=u(n).endOf("week"),this.month=this.intervalStart.clone()):(this.intervalEnd.isAfter(n,"month")&&(this.intervalEnd.set("month",n.month()).set("year",n.year()),this.month.set("month",n.month()).set("year",n.year())),this.intervalStart.isAfter(n,"month")&&this.intervalStart.set("month",n.month()).set("year",n.year())))),this._defaults=a,this._name="clndr",this.init()}n.prototype.init=function(){var t,e;if(this.daysOfTheWeek=this.options.daysOfTheWeek||[],e=this.options.formatWeekdayHeader||e,!this.options.daysOfTheWeek)for(this.daysOfTheWeek=[],e=this.options.formatWeekdayHeader||function(t){return t.format("dd").charAt(0)},t=0;t<7;t++)this.daysOfTheWeek.push(e(u().weekday(t)));if(this.options.weekOffset&&(this.daysOfTheWeek=this.shiftWeekdayLabels(this.options.weekOffset)),!p.isFunction(this.options.render)){if(this.options.render=null,"undefined"==typeof _)throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");this.compiledClndrTemplate=_.template(this.options.template)}p(this.element).html("<div class='clndr'></div>"),this.calendarContainer=p(".clndr",this.element),this.bindEvents(),this.render(),this.options.ready&&this.options.ready.apply(this,[])},n.prototype.validateOptions=function(){(6<this.options.weekOffset||this.options.weekOffset<0)&&(console.warn("clndr.js: An invalid offset "+this.options.weekOffset+" was provided (must be 0 - 6); using 0 instead."),this.options.weekOffset=0)},n.prototype.shiftWeekdayLabels=function(t){var e,n=this.daysOfTheWeek;for(e=0;e<t;e++)n.push(n.shift());return n},n.prototype.createDaysObject=function(e,n){var t,s,a,i,o,r,h,l,d=[],c=e.clone();n.diff(e,"days");if(this._currentIntervalStart=e.clone(),this.eventsLastMonth=[],this.eventsNextMonth=[],this.eventsThisInterval=[],this.options.events.length&&(this.eventsThisInterval=p(this.options.events).filter(function(){var t=this._clndrStartDateObject.isAfter(n);return!this._clndrEndDateObject.isBefore(e)&&!t}).toArray(),this.options.showAdjacentMonths&&(l=e.clone().subtract(1,"months").startOf("month"),r=l.clone().endOf("month"),h=n.clone().add(1,"months").startOf("month"),o=h.clone().endOf("month"),this.eventsLastMonth=p(this.options.events).filter(function(){var t=this._clndrEndDateObject.isBefore(l),e=this._clndrStartDateObject.isAfter(r);return!(t||e)}).toArray(),this.eventsNextMonth=p(this.options.events).filter(function(){var t=this._clndrEndDateObject.isBefore(h),e=this._clndrStartDateObject.isAfter(o);return!(t||e)}).toArray())),!this.options.lengthOfTime.days)if((a=c.weekday()-this.options.weekOffset)<0&&(a+=7),this.options.showAdjacentMonths)for(t=1;t<=a;t++)s=u([e.year(),e.month(),t]).subtract(a,"days"),d.push(this.createDayObject(s,this.eventsLastMonth));else for(t=0;t<a;t++)d.push(this.calendarDay({classes:this.options.targets.empty+" "+this.options.classes.lastMonth}));for(i=e.clone();i.isBefore(n)||i.isSame(n,"day");)d.push(this.createDayObject(i.clone(),this.eventsThisInterval)),i.add(1,"days");if(!this.options.lengthOfTime.days)for(;d.length%7!=0;)this.options.showAdjacentMonths?d.push(this.createDayObject(i.clone(),this.eventsNextMonth)):d.push(this.calendarDay({classes:this.options.targets.empty+" "+this.options.classes.nextMonth})),i.add(1,"days");if(this.options.forceSixRows&&42!==d.length)for(;d.length<42;)this.options.showAdjacentMonths?(d.push(this.createDayObject(i.clone(),this.eventsNextMonth)),i.add(1,"days")):d.push(this.calendarDay({classes:this.options.targets.empty+" "+this.options.classes.nextMonth}));return d},n.prototype.createDayObject=function(t,e){var n,s,a,i,o,r,h=0,l=u(),d=[],c="",p={isToday:!1,isInactive:!1,isAdjacentMonth:!1};for(!t.isValid()&&t.hasOwnProperty("_d")&&void 0!==t._d&&(t=u(t._d)),a=t.clone().endOf("day");h<e.length;h++)s=e[h]._clndrStartDateObject,n=e[h]._clndrEndDateObject,s<=a&&t<=n&&d.push(e[h]);return l.format("YYYY-MM-DD")===t.format("YYYY-MM-DD")&&(c+=" "+this.options.classes.today,p.isToday=!0),t.isBefore(l,"day")&&(c+=" "+this.options.classes.past),d.length&&(c+=" "+this.options.classes.event),this.options.lengthOfTime.days||(this._currentIntervalStart.month()>t.month()?(c+=" "+this.options.classes.adjacentMonth,p.isAdjacentMonth=!0,this._currentIntervalStart.year()===t.year()?c+=" "+this.options.classes.lastMonth:c+=" "+this.options.classes.nextMonth):this._currentIntervalStart.month()<t.month()&&(c+=" "+this.options.classes.adjacentMonth,p.isAdjacentMonth=!0,this._currentIntervalStart.year()===t.year()?c+=" "+this.options.classes.nextMonth:c+=" "+this.options.classes.lastMonth)),this.options.constraints&&(i=u(this.options.constraints.endDate),o=u(this.options.constraints.startDate),this.options.constraints.startDate&&t.isBefore(o)&&(c+=" "+this.options.classes.inactive,p.isInactive=!0),this.options.constraints.endDate&&t.isAfter(i)&&(c+=" "+this.options.classes.inactive,p.isInactive=!0)),!t.isValid()&&t.hasOwnProperty("_d")&&void 0!==t._d&&(t=u(t._d)),r=u(this.options.selectedDate),this.options.selectedDate&&t.isSame(r,"day")&&(c+=" "+this.options.classes.selected),c+=" calendar-day-"+t.format("YYYY-MM-DD"),c+=" calendar-dow-"+t.weekday(),this.calendarDay({date:t,day:t.date(),events:d,properties:p,classes:this.options.targets.day+c})},n.prototype.render=function(){var t,e,n,s,a,i,o,r,h={},l=null,d=null,c=this.intervalEnd.clone().add(1,"years"),p=this.intervalStart.clone().subtract(1,"years");if(this.calendarContainer.empty(),this.options.lengthOfTime.days)h={days:e=this.createDaysObject(this.intervalStart.clone(),this.intervalEnd.clone()),months:[],year:null,month:null,eventsLastMonth:[],eventsNextMonth:[],eventsThisMonth:[],extras:this.options.extras,daysOfTheWeek:this.daysOfTheWeek,intervalEnd:this.intervalEnd.clone(),numberOfRows:Math.ceil(e.length/7),intervalStart:this.intervalStart.clone(),eventsThisInterval:this.eventsThisInterval};else if(this.options.lengthOfTime.months){for(n=[],i=[],t=a=0;t<this.options.lengthOfTime.months;t++)o=(r=this.intervalStart.clone().add(t,"months")).clone().endOf("month"),e=this.createDaysObject(r,o),i.push(this.eventsThisInterval),n.push({days:e,month:r});for(t=0;t<n.length;t++)a+=Math.ceil(n[t].days.length/7);h={days:[],year:null,month:null,months:n,eventsThisMonth:[],numberOfRows:a,extras:this.options.extras,intervalEnd:this.intervalEnd,intervalStart:this.intervalStart,daysOfTheWeek:this.daysOfTheWeek,eventsLastMonth:this.eventsLastMonth,eventsNextMonth:this.eventsNextMonth,eventsThisInterval:i}}else h={days:e=this.createDaysObject(this.month.clone().startOf("month"),this.month.clone().endOf("month")),months:[],intervalEnd:null,intervalStart:null,year:this.month.year(),eventsThisInterval:null,extras:this.options.extras,month:this.month.format("MMMM"),daysOfTheWeek:this.daysOfTheWeek,eventsLastMonth:this.eventsLastMonth,eventsNextMonth:this.eventsNextMonth,numberOfRows:Math.ceil(e.length/7),eventsThisMonth:this.eventsThisInterval};if(this.options.render?this.calendarContainer.html(this.options.render.apply(this,[h])):this.calendarContainer.html(this.compiledClndrTemplate(h)),this.options.constraints){for(s in this.options.targets)"day"!==s&&this.element.find("."+this.options.targets[s]).toggleClass(this.options.classes.inactive,!1);for(t in this.constraints)this.constraints[t]=!0;this.options.constraints.startDate&&(d=u(this.options.constraints.startDate)),this.options.constraints.endDate&&(l=u(this.options.constraints.endDate)),d&&(d.isAfter(this.intervalStart)||d.isSame(this.intervalStart,"day"))&&(this.element.find("."+this.options.targets.previousButton).toggleClass(this.options.classes.inactive,!0),this.constraints.previous=!this.constraints.previous),l&&(l.isBefore(this.intervalEnd)||l.isSame(this.intervalEnd,"day"))&&(this.element.find("."+this.options.targets.nextButton).toggleClass(this.options.classes.inactive,!0),this.constraints.next=!this.constraints.next),d&&d.isAfter(p)&&(this.element.find("."+this.options.targets.previousYearButton).toggleClass(this.options.classes.inactive,!0),this.constraints.previousYear=!this.constraints.previousYear),l&&l.isBefore(c)&&(this.element.find("."+this.options.targets.nextYearButton).toggleClass(this.options.classes.inactive,!0),this.constraints.nextYear=!this.constraints.nextYear),(d&&d.isAfter(u(),"month")||l&&l.isBefore(u(),"month"))&&(this.element.find("."+this.options.targets.today).toggleClass(this.options.classes.inactive,!0),this.constraints.today=!this.constraints.today)}this.options.doneRendering&&this.options.doneRendering.apply(this,[])},n.prototype.bindEvents=function(){var t,a=this,i=p(this.element),e=this.options.targets,o=a.options.classes,n=(!0===this.options.useTouchEvents?"touchstart":"click")+".clndr";i.off(n,"."+e.day).off(n,"."+e.empty).off(n,"."+e.nextButton).off(n,"."+e.todayButton).off(n,"."+e.previousButton).off(n,"."+e.nextYearButton).off(n,"."+e.previousYearButton),i.on(n,"."+e.day,function(t){function e(){if(a.options.adjacentDaysChangeMonth){if(s.is("."+o.lastMonth))return a.backActionWithContext(a),!0;if(s.is("."+o.nextMonth))return a.forwardActionWithContext(a),!0}}var n,s=p(t.currentTarget);!a.options.trackSelectedDate||a.options.ignoreInactiveDaysInSelection&&s.hasClass(o.inactive)?e():!0!==e()&&(a.options.selectedDate=a.getTargetDateString(t.currentTarget),i.find("."+o.selected).removeClass(o.selected),s.addClass(o.selected)),a.options.clickEvents.click&&(n=a.buildTargetObject(t.currentTarget,!0),a.options.clickEvents.click.apply(a,[n]))}),i.on(n,"."+e.empty,function(t){var e,n=p(t.currentTarget);a.options.clickEvents.click&&(e=a.buildTargetObject(t.currentTarget,!1),a.options.clickEvents.click.apply(a,[e])),a.options.adjacentDaysChangeMonth&&(n.is("."+o.lastMonth)?a.backActionWithContext(a):n.is("."+o.nextMonth)&&a.forwardActionWithContext(a))}),t={context:this},i.on(n,"."+e.todayButton,t,this.todayAction).on(n,"."+e.nextButton,t,this.forwardAction).on(n,"."+e.previousButton,t,this.backAction).on(n,"."+e.nextYearButton,t,this.nextYearAction).on(n,"."+e.previousYearButton,t,this.previousYearAction)},n.prototype.buildTargetObject=function(t,e){var n,s,a,i={date:null,events:[],element:t};return e&&(s=this.getTargetDateString(t),i.date=s?u(s):null,this.options.events&&(n=this.options.multiDayEvents?(a=i.date.clone().endOf("day"),function(){return this._clndrStartDateObject<=a&&i.date<=this._clndrEndDateObject}):function(){return s===this._clndrStartDateObject.format("YYYY-MM-DD")},i.events=p.makeArray(p(this.options.events).filter(n)))),i},n.prototype.getTargetDateString=function(t){var e=t.className.indexOf("calendar-day-");return-1!==e?t.className.substring(e+13,e+23):null},n.prototype.triggerEvents=function(t,e){var n,s,a,i,o,r,h,l,d,c=[u(t.month)],p=t.options.lengthOfTime,v=t.options.clickEvents,y={end:t.intervalEnd,start:t.intervalStart},f=[u(t.intervalStart),u(t.intervalEnd)];a=y.start.isAfter(e.start)&&(1===Math.abs(y.start.month()-e.start.month())||11===e.start.month()&&0===y.start.month()),i=y.start.isBefore(e.start)&&(1===Math.abs(e.start.month()-y.start.month())||0===e.start.month()&&11===y.start.month()),r=y.start.month()!==e.start.month()||y.start.year()!==e.start.year(),n=y.start.year()-e.start.year()==1||y.end.year()-e.end.year()==1,s=e.start.year()-y.start.year()==1||e.end.year()-y.end.year()==1,o=y.start.year()!==e.start.year(),p.days||p.months?(h=y.start.isAfter(e.start),l=y.start.isBefore(e.start),d=h||l,h&&v.nextInterval&&v.nextInterval.apply(t,f),l&&v.previousInterval&&v.previousInterval.apply(t,f),d&&v.onIntervalChange&&v.onIntervalChange.apply(t,f)):(a&&v.nextMonth&&v.nextMonth.apply(t,c),i&&v.previousMonth&&v.previousMonth.apply(t,c),r&&v.onMonthChange&&v.onMonthChange.apply(t,c),n&&v.nextYear&&v.nextYear.apply(t,c),s&&v.previousYear&&v.previousYear.apply(t,c),o&&v.onYearChange&&v.onYearChange.apply(t,c))},n.prototype.back=function(t){var e=arguments[1]||this,n=e.options.lengthOfTime,s={end:e.intervalEnd.clone(),start:e.intervalStart.clone()};return t=p.extend(!0,{},{withCallbacks:!1},t),e.constraints.previous&&(n.days?(e.intervalStart.subtract(n.interval,"days").startOf("day"),e.intervalEnd=e.intervalStart.clone().add(n.days-1,"days").endOf("day")):(e.intervalStart.subtract(n.interval,"months").startOf("month"),e.intervalEnd=e.intervalStart.clone().add(n.months||n.interval,"months").subtract(1,"days").endOf("month")),e.month=e.intervalStart.clone(),e.render(),t.withCallbacks&&e.triggerEvents(e,s)),e},n.prototype.backAction=function(t){var e=t.data.context;e.backActionWithContext(e)},n.prototype.backActionWithContext=function(t){t.back({withCallbacks:!0},t)},n.prototype.previous=function(t){return this.back(t)},n.prototype.forward=function(t){var e=arguments[1]||this,n=e.options.lengthOfTime,s={end:e.intervalEnd.clone(),start:e.intervalStart.clone()};return t=p.extend(!0,{},{withCallbacks:!1},t),e.constraints.next&&(e.options.lengthOfTime.days?(e.intervalStart.add(n.interval,"days").startOf("day"),e.intervalEnd=e.intervalStart.clone().add(n.days-1,"days").endOf("day")):(e.intervalStart.add(n.interval,"months").startOf("month"),e.intervalEnd=e.intervalStart.clone().add(n.months||n.interval,"months").subtract(1,"days").endOf("month")),e.month=e.intervalStart.clone(),e.render(),t.withCallbacks&&e.triggerEvents(e,s)),e},n.prototype.forwardAction=function(t){var e=t.data.context;e.forwardActionWithContext(e)},n.prototype.forwardActionWithContext=function(t){t.forward({withCallbacks:!0},t)},n.prototype.next=function(t){return this.forward(t)},n.prototype.previousYear=function(t){var e=arguments[1]||this,n={end:e.intervalEnd.clone(),start:e.intervalStart.clone()};return t=p.extend(!0,{},{withCallbacks:!1},t),e.constraints.previousYear&&(e.month.subtract(1,"year"),e.intervalStart.subtract(1,"year"),e.intervalEnd.subtract(1,"year"),e.render(),t.withCallbacks&&e.triggerEvents(e,n)),e},n.prototype.previousYearAction=function(t){t.data.context.previousYear({withCallbacks:!0},t.data.context)},n.prototype.nextYear=function(t){var e=arguments[1]||this,n={end:e.intervalEnd.clone(),start:e.intervalStart.clone()};return t=p.extend(!0,{},{withCallbacks:!1},t),e.constraints.nextYear&&(e.month.add(1,"year"),e.intervalStart.add(1,"year"),e.intervalEnd.add(1,"year"),e.render(),t.withCallbacks&&e.triggerEvents(e,n)),e},n.prototype.nextYearAction=function(t){t.data.context.nextYear({withCallbacks:!0},t.data.context)},n.prototype.today=function(t){var e=arguments[1]||this,n=e.options.lengthOfTime,s={end:e.intervalEnd.clone(),start:e.intervalStart.clone()};t=p.extend(!0,{},{withCallbacks:!1},t),e.month=u().startOf("month"),n.days?(n.startDate?e.intervalStart=u().weekday(n.startDate.weekday()).startOf("day"):e.intervalStart=u().weekday(0).startOf("day"),e.intervalEnd=e.intervalStart.clone().add(n.days-1,"days").endOf("day")):(e.intervalStart=u().startOf("month"),e.intervalEnd=e.intervalStart.clone().add(n.months||n.interval,"months").subtract(1,"days").endOf("month")),e.intervalStart.isSame(s.start)&&e.intervalEnd.isSame(s.end)||e.render(),t.withCallbacks&&(e.options.clickEvents.today&&e.options.clickEvents.today.apply(e,[u(e.month)]),e.triggerEvents(e,s))},n.prototype.todayAction=function(t){t.data.context.today({withCallbacks:!0},t.data.context)},n.prototype.setMonth=function(t,e){var n=this.options.lengthOfTime,s={end:this.intervalEnd.clone(),start:this.intervalStart.clone()};return n.days||n.months?console.warn("clndr.js: You are using a custom date interval. Use Clndr.setIntervalStart(startDate) instead."):(this.month.month(t),this.intervalStart=this.month.clone().startOf("month"),this.intervalEnd=this.intervalStart.clone().endOf("month"),this.render(),e&&e.withCallbacks&&this.triggerEvents(this,s)),this},n.prototype.setYear=function(t,e){var n={end:this.intervalEnd.clone(),start:this.intervalStart.clone()};return this.month.year(t),this.intervalEnd.year(t),this.intervalStart.year(t),this.render(),e&&e.withCallbacks&&this.triggerEvents(this,n),this},n.prototype.setIntervalStart=function(t,e){var n=this.options.lengthOfTime,s={end:this.intervalEnd.clone(),start:this.intervalStart.clone()};return n.days||n.months?(n.days?(this.intervalStart=u(t).startOf("day"),this.intervalEnd=this.intervalStart.clone().add(n.days-1,"days").endOf("day")):(this.intervalStart=u(t).startOf("month"),this.intervalEnd=this.intervalStart.clone().add(n.months||n.interval,"months").subtract(1,"days").endOf("month")),this.month=this.intervalStart.clone(),this.render(),e&&e.withCallbacks&&this.triggerEvents(this,s)):console.warn("clndr.js: You are using a custom date interval. Use Clndr.setIntervalStart(startDate) instead."),this},n.prototype.setExtras=function(t){return this.options.extras=t,this.render(),this},n.prototype.setEvents=function(t){return this.options.multiDayEvents?this.options.events=this.addMultiDayMomentObjectsToEvents(t):this.options.events=this.addMomentObjectToEvents(t),this.render(),this},n.prototype.addEvents=function(t){var e=!(1<arguments.length)||arguments[1];return this.options.multiDayEvents?this.options.events=p.merge(this.options.events,this.addMultiDayMomentObjectsToEvents(t)):this.options.events=p.merge(this.options.events,this.addMomentObjectToEvents(t)),e&&this.render(),this},n.prototype.removeEvents=function(t){var e;for(e=this.options.events.length-1;0<=e;e--)!0===t(this.options.events[e])&&this.options.events.splice(e,1);return this.render(),this},n.prototype.addMomentObjectToEvents=function(t){for(var e=0;e<t.length;e++)t[e]._clndrStartDateObject=u(t[e][this.options.dateParameter]),t[e]._clndrEndDateObject=u(t[e][this.options.dateParameter]);return t},n.prototype.addMultiDayMomentObjectsToEvents=function(t){for(var e,n,s=0,a=this.options.multiDayEvents;s<t.length;s++)e=t[s][a.endDate],n=t[s][a.startDate],e||n?(t[s]._clndrEndDateObject=u(e||n),t[s]._clndrStartDateObject=u(n||e)):(t[s]._clndrEndDateObject=u(t[s][a.singleDay]),t[s]._clndrStartDateObject=u(t[s][a.singleDay]));return t},n.prototype.calendarDay=function(t){var e={day:"",date:null,events:[],classes:this.options.targets.empty};return p.extend({},e,t)},n.prototype.destroy=function(){var t=p(this.calendarContainer);t.parent().data("plugin_clndr",null),t.empty().remove(),this.options=a,this.element=null},p.fn.clndr=function(t){var e;if(1<this.length)throw new Error("CLNDR does not support multiple elements yet. Make sure your clndr selector returns only one element.");if(!this.length)throw new Error("CLNDR cannot be instantiated on an empty selector.");return this.data("plugin_clndr")?this.data("plugin_clndr"):(e=new n(this,t),this.data("plugin_clndr",e),e)}});
