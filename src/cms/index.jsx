/* globals gapi:false */
import * as CMS from 'netlify-cms';

import TestRepo from './backends/TestRepo';
import ImageWidget from './widgets/ImageWidget';
import NewsPreview from './previews/NewsPreview';
import MemberPreview from './previews/MemberPreview';
import ArticlePreview from './previews/ArticlePreview';

// For Google Picker API
gapi.load('auth', {});
gapi.load('picker', {});

CMS.registerBackend('test-dev-repo', TestRepo);

CMS.registerWidget('image', ImageWidget);

CMS.registerPreviewTemplate('news', NewsPreview);
CMS.registerPreviewTemplate('members', MemberPreview);
CMS.registerPreviewTemplate('articles', ArticlePreview);

CMS.init();
