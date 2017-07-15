import React from 'react';
import { shallow } from 'enzyme';
import Modal from "./Modal";

describe('Modal', () => {

  it('renders the child component', () => {
    const component = shallow(
      <Modal>
        <div id="my-modal-child">
          {/* Submit all complaints RE unfunny jokes to root@localhost */}
          <p>What do bees survey their employees with? A Hive!</p>
        </div>
      </Modal>
    );

    expect(component.find('#my-modal-child')).not.toBeEmpty();
  });

});
