import * as React from "react";
import './modal.scss';

export const JxModalTitle = (props: any) => (
  <div className="modal-title">{props.children}</div>
);

export const JxModalBody = (props: any) => (
  <div className="modal-body">{props.children}</div>
);
