import React from 'react';

import * as Select from '@radix-ui/react-select';
import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';
import classnames from 'classnames';

import './SelectDemo.scss';

const SelectDemo = () => (
    <Select.Root>
        <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder="Select available project"/>
            <Select.Icon className="SelectIcon">
                <ChevronDownIcon/>
            </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon/>
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    <Select.Group>
                        <Select.Label className="SelectLabel">Projects</Select.Label>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon/>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);

const SelectItem = React.forwardRef(({children, className, ...props}, forwardedRef) => {
    return (
        <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon/>
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export default SelectDemo;