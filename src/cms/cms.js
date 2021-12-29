import CMS from 'netlify-cms-app'

import { LongFormContentPreview } from '../templates/long-form-content'
import { StaticPageContentPreview } from '../templates/static-page-content'
import { CaseStudyContentPreview } from '../templates/case-study-content'
import { SolutionContentPreview } from '../templates/solution-content'

CMS.registerPreviewTemplate('blog', LongFormContentPreview)
CMS.registerPreviewTemplate('index', StaticPageContentPreview)
CMS.registerPreviewTemplate('caseStudy', CaseStudyContentPreview)
CMS.registerPreviewTemplate('solutions', SolutionContentPreview)
