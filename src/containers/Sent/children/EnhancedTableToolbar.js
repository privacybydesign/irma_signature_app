import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';

// Icons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class EnhancedTableToolbar extends Component {
  render() {
    const {
      num,
      onDelete,
      page,
      rowsPerPage,
      onChangePage,
      onChangeRowsPerPage,
      count,
    } = this.props;

    return (
      <Toolbar>
        { num === 0 ? null :
        <React.Fragment>
          <Typography variant="subheading">{num} selected</Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
        }
        <TablePagination
          component="div"
          style={{flex: 1, align: 'right'}}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  num: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
