import { mount } from '@vue/test-utils';
import ImageCard from '../src/components/ImageCard.vue';

describe('ImageCard.vue', () => {
  const mockImage = {
    id: 1,
    download_url: 'https://picsum.photos/id/1/200/300',
    author: 'Author 1',
    loaded: false,
  };

  // Mock the IntersectionObserver before each test
  beforeEach(() => {
    global.IntersectionObserver = jest.fn((callback) => ({
      observe: jest.fn((element) => {
        callback([{ isIntersecting: true, target: element }]); // Simulate that the image is visible
      }),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  // Clean up the IntersectionObserver mock after each test
  afterEach(() => {
    delete global.IntersectionObserver;
  });

  it('renders the image correctly', () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockImage.download_url); // Check if the src attribute is correct
    expect(img.attributes('alt')).toBe(mockImage.author); // Check if the alt attribute is correct
  });

  it('emits the "remove" event when the delete overlay is clicked', async () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    const removeOverlay = wrapper.find('.group-hover\\:opacity-85'); // Find the delete overlay element
    await removeOverlay.trigger('click'); // Simulate a click on the overlay

    expect(wrapper.emitted('remove')).toBeTruthy(); // Check if the "remove" event was emitted
    expect(wrapper.emitted('remove')[0]).toEqual([mockImage]); // Verify the event payload
  });

  it('emits the "load" event with the image when the image is loaded', async () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    const img = wrapper.find('img');

    // Simulate the load event on the image element
    await img.trigger('load');

    // Assert that the "load" event was emitted with the image object
    expect(wrapper.emitted('load')).toBeTruthy(); // Check if the "load" event was emitted
    expect(wrapper.emitted('load')[0][0]).toEqual(mockImage); // Verify the event payload
  });

  it('matches the snapshot', () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: mockImage,
      },
    });

    expect(wrapper.html()).toMatchSnapshot(); // Ensure the component's HTML matches the snapshot
  });
});
