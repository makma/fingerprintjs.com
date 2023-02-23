import CMS from 'netlify-cms-app'

import { LongFormContentPreview } from '../templates/long-form-content'
import { StaticPageContentPreview } from '../templates/static-page-content'
import { CaseStudyContentPreview } from '../templates/case-study-content'
import { UseCaseContentPreview } from '../templates/use-case-content'
import { NotificationBarContentPreview } from '../templates/notification-bar-content'
import { TeamMembersContentPreview } from '../templates/team-members-content'
import { FaqContentPreview } from '../templates/faq-content'
import { PressPageContentPreview } from '../templates/press-page-content'

CMS.registerPreviewTemplate('blog', LongFormContentPreview)
CMS.registerPreviewTemplate('index', StaticPageContentPreview)
CMS.registerPreviewTemplate('caseStudy', CaseStudyContentPreview)
CMS.registerPreviewTemplate('useCases', UseCaseContentPreview)
CMS.registerPreviewTemplate('notificationBar', NotificationBarContentPreview)
CMS.registerPreviewTemplate('teamMembers', TeamMembersContentPreview)
CMS.registerPreviewTemplate('faq', FaqContentPreview)
CMS.registerPreviewTemplate('press', PressPageContentPreview)
