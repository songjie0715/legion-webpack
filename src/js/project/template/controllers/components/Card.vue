<template>
    <div>
        <div class="main-toolbar">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#"><i class="fa fa-home"></i> Home</a></li>
                <li class="breadcrumb-item"><a href="#">Library</a></li>
                <li class="breadcrumb-item active">Data</li>
            </ol>
            <h1 class="page-title">
                <i class="fa fa-home icon"></i>Card
            </h1>
            <p class="description">overview & stats</p>
        </div>
        <div class="main-content bd">
            <div class="row mb-4">
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="actions">
                                <i class="fa fa-cog pointer" v-tooltip title="Config"></i>
                                <i class="fa fa-remove pointer" v-tooltip title="Remove"></i>
                            </div>
                            <h5 class="card-title">Card Title</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                        <div class="card-footer">
                            Footer
                            <div class="actions">
                                <button class="btn btn-success"><i class="fa fa-plus"></i> Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="card">
                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs pull-xs-left">
                                <li class="nav-item">
                                    <a class="nav-link active">Active</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">Link</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-block">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td class="actions">
                                        <a href="#"><i class="fa fa-cog pointer" v-tooltip title="设置"></i></a>
                                        <i class="fa fa-remove pointer" v-tooltip title="删除"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td class="actions">
                                        <i class="fa fa-cog pointer" v-tooltip title="设置"></i>
                                        <i class="fa fa-remove pointer" v-tooltip title="删除"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td class="actions">
                                        <i class="fa fa-cog pointer" v-tooltip title="设置"></i>
                                        <i class="fa fa-remove pointer" v-tooltip title="删除"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header no-border">
                            <h5 class="card-title">Form</h5>
                        </div>
                        <div class="card-block">
                            <div class="form">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleSelect1">Example select</label>
                                        <select class="form-control" id="exampleSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleTextarea">Example textarea</label>
                                        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputFile">File input</label>
                                        <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                                        <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                                    </div>
                                    <fieldset class="form-group">
                                        <legend>Radio buttons</legend>
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                                                Option one is this and that&mdash;be sure to include why it's great
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
                                                Option two can be something else and selecting it will deselect option one
                                            </label>
                                        </div>
                                        <div class="form-check disabled">
                                            <label class="form-check-label">
                                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
                                                Option three is disabled
                                            </label>
                                        </div>
                                    </fieldset>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="checkbox" class="form-check-input">
                                            Check me out
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="actions">
                                <button class="btn btn-secondary">Cancel</button>
                                <button class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardView'
    }
</script>