import { mount, flushPromises } from '@vue/test-utils';
import ImageGrid from '../src/components/ImageGrid.vue';
import ImageCard from '../src/components/ImageCard.vue';

// Mock the IntersectionObserver
beforeEach(() => {
  global.IntersectionObserver = jest.fn((callback) => ({
    observe: jest.fn((element) => {
      // Simulate that all images are immediately visible
      callback([{ isIntersecting: true, target: element }]);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock fetch to return sample images
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, download_url: 'https://picsum.photos/id/1/200/300', author: 'Author 1', loaded: false },
          { id: 2, download_url: 'https://picsum.photos/id/2/200/300', author: 'Author 2', loaded: false },
        ]),
    })
  );
});

// Clean up mocks after each test
afterEach(() => {
  jest.resetAllMocks();
  delete global.IntersectionObserver;
});

describe('ImageGrid.vue', () => {
  it('renders `ImageCard` for each image in the state', async () => {
    const wrapper = mount(ImageGrid);

    // Wait for the fetch promise to resolve
    await flushPromises();

    // Verify that 2 ImageCard components are rendered
    const cards = wrapper.findAllComponents(ImageCard);
    expect(cards.length).toBe(2);
  });

  it('removes an image from the state when the "remove" event is emitted', async () => {
    const wrapper = mount(ImageGrid);

    // Wait for the initial images to load
    await flushPromises();

    // Verify the initial state of images
    expect(wrapper.vm.images.length).toBe(2);

    // Emit the "remove" event from the first ImageCard
    const card = wrapper.findComponent(ImageCard);
    const imageToRemove = wrapper.vm.images[0];
    await card.vm.$emit('remove', imageToRemove);

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick();

    // Verify that the image is removed from the state
    expect(wrapper.vm.images.length).toBe(1);
    expect(wrapper.vm.images[0].id).not.toBe(imageToRemove.id);
  });

  it('matches the snapshot', async () => {
    const wrapper = mount(ImageGrid);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
