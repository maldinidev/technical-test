import { mount } from '@vue/test-utils';
import LoadingIndicator from '../src/components/LoadingIndicator.vue';

describe('LoadingIndicator.vue', () => {
  it('muestra el mensaje de carga cuando `loading` es true', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.text()).toContain('Cargando imágenes...');
  });

  it('no muestra el mensaje de carga cuando `loading` es false', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: false,
      },
    });

    expect(wrapper.text()).not.toContain('Cargando imágenes...');
  });

  it('matches the snapshot when loading is true', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches the snapshot when loading is false', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the loading message only when `loading` is true', async () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    // Verify that the div is rendered
    expect(wrapper.find('div').exists()).toBe(true);

    // Change the loading prop to false
    await wrapper.setProps({ loading: false });

    // Verify that the div is removed
    expect(wrapper.find('div').exists()).toBe(false);
  });

  it('adds appropriate ARIA attributes when loading is true', () => {
    const wrapper = mount(LoadingIndicator, {
      props: {
        loading: true,
      },
    });

    const loadingDiv = wrapper.find('div');
    expect(loadingDiv.attributes('role')).toBe('status');
    expect(loadingDiv.attributes('aria-live')).toBe('polite');
  });
});
