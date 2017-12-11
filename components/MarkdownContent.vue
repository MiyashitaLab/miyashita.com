<style src="./MarkdownContent.css" lang="postcss" module></style>

<script>
import toH from 'hast-to-hyperscript';
import AwesomeIframe from './AwesomeIframe';

export default {
  data: () => ({
    components: {
      a: 'Link',
      img: 'MarkdownImage',
      iframe: 'AwesomeIframe',
    },
  }),
  props: {
    ast: {
      type: Object,
      required: true,
    },
  },
  render(h) {
    const _h = (tag, attrs, children) => {
      const _tag = this.components[tag] || tag;
      return h(_tag, { attrs }, children);
    };
    return h('div', { class: this.$style.markdownBody }, [toH(_h, this.ast)]);
  },
  components: {
    AwesomeIframe,
    MarkdownImage: {
      props: ['src'],
      render(h) {
        return h('OptimizedImage', {
          attrs: {
            width: 500,
            src: this.src,
          },
        });
      },
    },
  },
};
</script>
