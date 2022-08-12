import { Select, Spin } from "antd";
import lodash from "lodash";
import React, { useMemo, useRef, useState } from "react";
import { NewChatGroupService, User } from "../../../../_shared/apis/chat_group";

function DebounceSelect({ fetchOptions= (input: any)=>{return new Promise(()=>{})}, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: any) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return lodash.debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      size="small"
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

async function fetchUserList(username: string): Promise<any> {
  let service = NewChatGroupService()

  return service.searchUsers(username)
  .then((resp) => {
    let users = resp.users

    return users?.map((user: User) => ({
      label: `${user.username}`,
      value: user.user_id,
    }))
  })
}

type DebounceSelectInputProps = {
  input: any[];
  setInput: (input: never[]) => void
}

const DebounceSelectInput = (props: DebounceSelectInputProps) => {
  const { input, setInput } = props

  return (
    <DebounceSelect
      mode="multiple"
      value={input}
      placeholder="Select users"
      fetchOptions={fetchUserList}
      onChange={(newValue: any) => {
        setInput(newValue);
      }}
      size="medium"
    />
  );
};

export default DebounceSelectInput;
