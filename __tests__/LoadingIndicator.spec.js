import { mount } from '@vue/test-utils';
import LoadingIndicator from '../src/components/LoadingIndicator.vue';

describe('LoadingIndicator.vue', () => {
  it('displays the loading message when `loading` is true', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    // Verify that the loading message is displayed
    expect(wrapper.text()).toContain('Cargando imágenes...');
  });

  it('does not display the loading message when `loading` is false', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: false,
      },
    });

    // Verify that the loading message is not displayed
    expect(wrapper.text()).not.toContain('Cargando imágenes...');
  });

  it('matches the snapshot when `loading` is true', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    // Verify that the component matches the snapshot
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches the snapshot when `loading` is false', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: false,
      },
    });

    // Verify that the component matches the snapshot
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the loading message only when `loading` is true', async () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    // Verify that the div is rendered when `loading` is true
    expect(wrapper.find('div').exists()).toBe(true);

    // Update the `loading` prop to false
    await wrapper.setProps({ loading: false });

    // Verify that the div is removed when `loading` is false
    expect(wrapper.find('div').exists()).toBe(false);
  });

  it('adds appropriate ARIA attributes when `loading` is true', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    const loadingDiv = wrapper.find('div');
    // Verify that ARIA attributes are added
    expect(loadingDiv.attributes('role')).toBe('status');
    expect(loadingDiv.attributes('aria-live')).toBe('polite');
  });
});
