package app.opiner.modules.lib.file;

import java.io.File;
import java.io.IOException;

/**
 * Declares how {@link FileCache} will use disc space.
 *
 * @author Alexey Danilov ('').
 */
public interface DiskUsage {

    void touch(File file) throws IOException;

}
