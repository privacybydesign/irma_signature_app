import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flatten from 'flatten';

// Material UI
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Divider from 'material-ui/Divider';

class AttributeResultTable extends Component {

  genUnmatchedTableData = () => {
    const credentialList = this.props.attributes;

    // TODO: make this less complicated
    return flatten(
      credentialList.map(credential => (
        Object.keys(credential.attributes)
          .map(attributeId => ({
            key: attributeId,
            name: attributeId, // TODO convert to name
            value: credential.attributes[attributeId],
            valid: this.props.proofStatus,
          }))
      ))
    );
  }

  genMatchedTableData = () => {
    const { attributes } = this.props;
    return attributes.map(attribute => ({
      key: attribute.disclosedId,
      name: attribute.label, // TODO use attribute name or label?
      value: attribute.disclosedValue,
      valid: attribute.proofStatus,
    }));
  }

  genTableBody = () => {
    const { matched } = this.props;

    if (this.props.attributes === undefined) {
      return <TableBody><TableRow /></TableBody>;
    }

    const tableData = (matched ? this.genMatchedTableData() : this.genUnmatchedTableData());

    return (
      <TableBody>
        {tableData
          .map(el => (
            <TableRow key={el.key} >
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.value}</TableCell>
                <TableCell>{el.valid}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    );
  }

  render() {
    return (
      <Card style={{ marginTop: '30px' }}>
        <CardHeader
          title="Attributes" /> <Divider />
        <CardContent style={{ paddingTop: '0px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attribute</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Valid?</TableCell>
              </TableRow>
            </TableHead>
            {this.genTableBody()}
          </Table>
        </CardContent>
      </Card>
    );
  }
}

AttributeResultTable.propTypes = {
  matched: PropTypes.bool.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object), // Only if there are attributes disclosed
  proofStatus: PropTypes.string, // Only with unmatched requests
};

export default AttributeResultTable;
